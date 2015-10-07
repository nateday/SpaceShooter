var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('build'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});