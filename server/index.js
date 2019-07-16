const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(`${__dirname}/../client/public`));

app.listen(8080);
console.log('[ INFO ] server listens on port 8080.');
