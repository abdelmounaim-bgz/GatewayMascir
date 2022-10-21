var express = require("express"),
    app = express(),
    http = require("http").Server(app).listen(80),
    fs = require("fs"),
    path = require("path"),
    bodyParser = require("body-parser");

const routes = require("./routes");
app.use("/config", routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "ejs");
console.log(`Server is listening on port: 80`);
app.get("/", function (req, res) {
    res.render("index.html")

    // res.render("content")
});
