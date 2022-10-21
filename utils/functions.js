const util = require("util");
const exec = util.promisify(require("child_process").exec);
module.exports = {
    getWiFiList: async function() {
        const { stdout, stderr } = await exec("nmcli device wifi list");

        if (stderr) {
            console.error(`error: ${stderr}`);
        }
        console.log(stdout)
        return stdout
    },
    connectWifi: async function(ssid, password) {
        if (password != "") {
            const { stdout, stderr } = await exec("nmcli dev wifi connect " + ssid + " password " + password);
            if (stderr) {
                console.error(`error: ${stderr}`);
                return stderr
            }
            console.log(stdout)
            return stdout
        } else {
            const { stdout, stderr } = await exec("nmcli dev wifi connect " + ssid);
            if (stderr) {
                console.error(`error: ${stderr}`);
                return stderr
            }
            console.log(stdout)
            return stdout
        }

    }


}