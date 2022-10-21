var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var functions = require('./utils/functions')
var auth = false;
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.get("/", function(req, res) {
    res.render("index.html")
});
router.post('/auth', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username == "admin" && password == "admin1234") {
        auth = true;
        res.redirect("/config/dashboard")
    } else {
        auth = false;
        res.render("unauthorized.html")
    }

});
router.get('/disconnect', function(req, res) {
    auth = false;
    res.redirect("/")
});
router.get("/dashboard", function(req, res) {
    res.render("dashboard.ejs");
});
router.get("/wifi", function(req, res) {
    res.render("wifi.ejs");
});
router.get("/lora", function(req, res) {
    res.render("lora.ejs");
});
router.get("/settings", function(req, res) {
    res.render("settings.ejs");
});
router.get("/wifilist", async function(req, res) {
    var wifiList = await functions.getWiFiList();
    console.log("from server : " + wifiList);
    res.send(wifiList)
});
router.post("/wificonnect", async function(req, res) {

    var cnxResp = await functions.connectWifi(req.body.ssid, req.body.password);
    res.send(cnxResp)
    console.log("from server : " + cnxResp);

});
module.exports = router;