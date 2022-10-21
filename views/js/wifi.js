function showWifiModal(ssid, security) {

    $('#wifiModal').modal('show');
    $('#wifiModal').find('.modal-title').text("Wi-Fi Profile: " + ssid);
    var form = document.forms['form'];
    form.elements['profile'].value = ssid;
    form.elements['ssid'].value = ssid;
    form.elements['security'].value = security;
    var insertedPassword = form.elements['password']
    if (security != "--") {
        insertedPassword.onfocus = function() {
            if (insertedPassword.value.length >= 8) {
                document.getElementById("message").style.display = "none";
            } else {
                document.getElementById("message").style.display = "block";
            }

        }
        insertedPassword.onblur = function() {
            if (insertedPassword.value.length >= 8) {
                document.getElementById("message").style.display = "none";
            } else {
                document.getElementById("message").style.display = "block";
            }
        }
        insertedPassword.onkeyup = function() {
            if (insertedPassword.value.length >= 8) {
                document.getElementById("message").style.display = "none";
            } else {
                document.getElementById("message").style.display = "block";
            }
        }
    }

}

function connectWifi() {
    document.getElementById("message").style.display = "none";
    document.getElementById("success-message").style.display = "none";
    document.getElementById("failure-message").style.display = "none";
    var form = document.forms['form'];
    var ssid = form.elements['ssid'].value;
    var password = form.elements['password'].value;
    var buttonS = '<button type="button" class="btn btn-secondary" data-dismiss="modal" disabled>Cancel</button><button type="button" class="btn btn-secondary" disabled>Connect</button><div class="spinner-border ml-3" role="status"></div>';
    var btns = document.getElementById("modalBtns");
    btns.innerHTML = buttonS;
    var data = JSON.stringify({ "ssid": ssid, "password": password })
    var cnxResp = httpCli("POST", "/config/wificonnect", data)
    buttonS = ' <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-primary" onclick="connectWifi()">Connect</button>'
    btns.innerHTML = buttonS;
    if (cnxResp.includes("activé")) {
        document.getElementById("success-message").style.display = "block";
    } else {
        document.getElementById("failure-message").style.display = "block";
    }
    console.log(cnxResp);

}

function changeState(type) {
    if (type) {
        var buttonS = '<a onclick="changeState(false)" class="btn btn-danger w-25 text-white">Stop</a><div class="ml-5 ">Scanning ...</div><div class="spinner-border ml-3" role="status"></div>';
        var btn = document.getElementById("btn");
        btn.innerHTML = buttonS;
        var content = '<div class="card shadow p-3 my-4 border rounded"><table class="table table-hover"><thead><tr><th scope="col">SSID</th><th scope="col">BSSID</th><th scope="col">Channel</th><th scope="col">Signal</th><th scope="col">Security</th></tr></thead><tbody>'

        var wifiList = httpCli("GET", "/config/wifilist")
        wifiList = wifiList.split("\n")
        wifiList.shift()
        wifiList.pop()
            // console.log(wifiList)
        wifiList.forEach((wifi) => {
            wifi = wifi.trim()
            var wifiarr = wifi.split(" ")
                // wifiarr = wifiarr.shift()
            wifiarr = wifiarr.filter(function(value, index, arr) { return value != "" })
            console.log(wifiarr)
            if (wifiarr.length == 9) {
                var ssid = wifiarr[1];
                var bssid = wifiarr[0];
                var channel = wifiarr[3];
                var rssi = wifiarr[7];
                var security = wifiarr[8];
                content += '<tr><th scope="row">' + ssid + '</th><td>' + bssid + '</td><td>' + channel + '</td><td>' + rssi + '</td><td>' + security + '</td><td><a onclick="showWifiModal(\'' + ssid + '\',\'' + security + '\')" class="btn btn-outline-primary text-primary">Se connecter</a></td></tr>';
            } else if (wifiarr.length == 10 && wifiarr[0] == "*") {
                var ssid = wifiarr[2];
                var bssid = wifiarr[1];
                var channel = wifiarr[4];
                var rssi = wifiarr[8];
                var security = wifiarr[9];
                content += '<tr><th scope="row">' + ssid + '</th><td>' + bssid + '</td><td>' + channel + '</td><td>' + rssi + '</td><td>' + security + '</td><td><a onclick="showWifiModal(\'' + ssid + '\',\'' + security + '\')" class="btn btn-outline-primary text-primary">Se connecter</a></td></tr>';

            } else {
                var ssid = wifiarr[1] + " " + wifiarr[2];
                var bssid = wifiarr[0];
                var channel = wifiarr[4];
                var rssi = wifiarr[8];
                var security = wifiarr[9];
                content += '<tr><th scope="row">' + ssid + '</th><td>' + bssid + '</td><td>' + channel + '</td><td>' + rssi + '</td><td>' + security + '</td><td><a onclick="showWifiModal(\'' + ssid + '\',\'' + security + '\')" class="btn btn-outline-primary text-primary">Se connecter</a></td></tr>';
            }

        })

        content += '</tbody >    </table ></div > ';
        var table = document.getElementById("table");

        table.innerHTML = content;
        var buttonS = ' <a onclick="changeState(true)" class="btn btn-primary w-25 text-white">Scan</a>';

        var btn = document.getElementById("btn");

        btn.innerHTML = buttonS;

    } else {
        var content = '';
        var buttonS = ' <a onclick="changeState(true)" class="btn btn-primary w-25 text-white">Scan</a>';
        var table = document.getElementById("table");
        var btn = document.getElementById("btn");
        table.innerHTML = content;
        btn.innerHTML = buttonS;

    }
}