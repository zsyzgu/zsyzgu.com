var http = require('http'),
	fs = require('fs');

http.createServer(function (req, res) {
	var url = req.url;
	var qIndex = url.indexOf('?');
	if (qIndex != -1) {
		url = url.substring(0, qIndex);
	}
	
	if(url.indexOf('.html') != -1) {
		fs.readFile(__dirname + '/views/' + url, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
				res.end();
			}
		});
	} else {
		var mapping = [
			{suf: '.js', type: 'text/javascript'},
			{suf: '.css', type: 'text/css'},
			{suf: '.png', type: 'image/png'},
			{suf: '.jpg', type: 'image/jpeg'}
		];
		var find = 0;
		for (var obj in mapping) {
			if(url.indexOf(mapping[obj].suf) != -1) {
				fs.readFile(__dirname + url, function (err, data) {
					if (err) {
						console.log(err);
					} else {
						res.writeHead(200, {'Content-Type': mapping[obj].type});
						res.write(data);
						res.end();
					}
				});
				find = 1;
				break;
			}
		}
		if (find == 0) {
			fs.readFile(__dirname + url, function (err, data) {
				if (err) {
					console.log(err);
				} else {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write(data);
					res.end();
				}
			});
		}
	}
}).listen(8888, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8888/');
