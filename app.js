var express = require ('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 3700;

var game = require("./game");
console.log(__dirname + '/assets');
app.use(express.static(__dirname + '/assets'));
 
server.listen(port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/game', function (req, res) {
  res.sendFile(__dirname + '/game.html');
});

io.on('connection', function (client) {
	game.initGame(io, client);
});