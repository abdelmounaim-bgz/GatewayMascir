var Url = "http://0.0.0.0";


function httpCli(method, api, data) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(method, Url + api, false);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(data);
    return xmlHttp.responseText;
}