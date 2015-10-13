var app = require('express')();
var http = require('http').Server(app);
var querystring = require('querystring');
var io = require('socket.io')(http);


var message = {
			text: 'Hi. I\'m Alice and we\'re here to help you use the site better',
			type: 'business'				
		}

app.get('/', function(req, res){
	res.set({
		'Content-type': 'application/json',
		'Content-Length': JSON.stringify(message).length,
		'Access-Control-Allow-Origin': 'http://localhost:9000'
	});
	res.send(message);
});

app.post('/', function(req,res){
	req.on('data', function(chunk) {
		var parsedBody = querystring.parse(chunk.toString()); 
		parsedBody.type = 'business';
		res.set({
			'Content-type': 'application/json',
			'Content-Length': JSON.stringify(parsedBody).length,
			'Access-Control-Allow-Origin': 'http://localhost:9000'
		});
		res.send(parsedBody);
	});
});

io.on('connection', function(socket){
	console.log('user connected');
	socket.on('chat message', function(chatMessage){
		console.log('Chat message is: ' + JSON.stringify(chatMessage));
		io.emit('chat message', chatMessage);
	})
	socket.on('disconnect', function(){
		console.log('user is disconnected');
	});
});


http.listen(8081, function() {
	console.log('Node Zen Desk Server running at http://127.0.0.1:8081');
});