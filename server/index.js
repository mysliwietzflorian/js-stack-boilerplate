const express = require('express');
const app = express();
const path = require('path');

const os = require('os');

app.use(express.static(`${__dirname}/../client/public`));

app.listen(8080);

console.log('[INFO] Development server running!\n');
console.log('Local:    http://localhost:8080');
console.log(`External: http://${getIpAddress('WLAN')}:8080`);
console.log('\nUse Ctrl+C to quit this process');

function getIpAddress(name) {
    let interfaces = os.networkInterfaces();
    let result = interfaces[name].filter(details => {
        return details.family == 'IPv4';
    });
    return result.length > 0 ? result[0].address : undefined;
};
