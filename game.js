exports.createPack = createPack();

exports.initGame = function(gameIO, gameSocket) {
	gameSocket.emit('connected', { message: "You are connected!" });
	gameSocket.on('hostNewGame', hostCreateNewGame);
	gameSocket.on('joinGame', joinGame);
}

function hostCreateNewGame(data) {
    thisGameId = ( Math.random() * 10000000 ) | 0;
    this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id});
    this.join(thisGameId.toString());
    console.log(thisGameId);
}

function joinGame(data){
	this.join(data.gameId);
	this.broadcast.to(data.gameId).emit('playerJoinedRoom', data);
}

function createPack() {
	  var suits = new Array("H", "C", "S", "D");
		var pack = new Array();
		var n = 52;
		var index = n / suits.length;

		var count = 0;
		for(i = 0; i <= 3; i++)
				for(j = 1; j <= index; j++)
						pack[count++] = j + suits[i];

		return pack;  
}