var userName = '';
var socket = io.connect('http://localhost:3700');
var gameId = '';
var pack = '';
$(document).ready(function(){
    
    $(document).on('click', '#set-username', function(){
        userName = $('#username').val();
    });

    $(document).on('click', '#host-game', function(){
        socket.emit('hostNewGame', {
            username: userName
        })
    });

    $(document).on('click', '#join-game', function(){
        gameId = $('#game-id').val();
        if(gameId != '') {
            $('#username-prompt').hide();
            socket.emit('joinGame', {
                gameId:gameId,
                username: userName,
            });
        }
    });
});

socket.on('playerJoinedRoom', function(data){
    console.log("Player Joined the game"+data.username);
});

socket.on('newGameCreated', function(data){
    console.log("New Game Created"+data.gameId);
});