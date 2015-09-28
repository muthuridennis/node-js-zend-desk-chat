var http = require('http');

var message = {
			text: 'Hi. I\'m Alice and we\'re here to help you use the site better',
			type: 'business'				
		}

var server = http.createServer(function(request, response) {
								response.writeHead(200, {
									'Content-type': 'application/json',
									'Content-Length': JSON.stringify(message).length,
									'Access-Control-Allow-Origin': 'http://localhost:9000'
								});
								response.end(JSON.stringify(message));
							});

server.listen(8081);

console.log('Node Zen Desk Server running at http://127.0.0.1:8081');

