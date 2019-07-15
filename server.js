const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){

	let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log('ip: ' + ip);

	res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080);
console.log('server listens on port 8080.');
