var http = require('http');
var querystring = require('querystring');

var message = {
			text: 'Hi. I\'m Alice and we\'re here to help you use the site better',
			type: 'business'				
		}

var server = http.createServer(function(request, response) {
								console.log('http://127.0.0.1:8081 %s', request.method);

								var parsedBody; 

								switch(request.method.toLowerCase()){
									case 'get':
										response.writeHead(200, {
											'Content-type': 'application/json',
											'Content-Length': JSON.stringify(message).length,
											'Access-Control-Allow-Origin': 'http://localhost:9000'
										});
										response.end(JSON.stringify(message));
										break;
									case 'post':
										request.on('data', function(chunk) {
											parsedBody = querystring.parse(chunk.toString()); 
										})
										request.on('end', function() {
											parsedBody.type = 'business';
											response.writeHead(200, {
												'Content-type': 'application/json',
												'Content-Length': JSON.stringify(parsedBody).length,
												'Access-Control-Allow-Origin': 'http://localhost:9000'
											});
											console.log(parsedBody);
											response.write(JSON.stringify(parsedBody));
											response.end();
										});
										break;
								}


							});

server.listen(8081);

console.log('Node Zen Desk Server running at http://127.0.0.1:8081');

