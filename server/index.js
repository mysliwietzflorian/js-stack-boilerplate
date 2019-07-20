const express = require('express');
const fs = require('fs');
const https = require('https');
const os = require('os');

const app = express();

app.use(express.static(`${__dirname}/../client/public`));

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(8080, () => initializeServer());

function initializeServer() {
    let networkInterfaceName = process.argv.length > 2 ?
        process.argv[2] : 'WLAN';
    let externalIp = getIpAddress(networkInterfaceName);

    console.log('[INFO] Development server running!\n');
    console.log('Local:    http://localhost:8080');

    if (externalIp) {
        console.log(`External: http://${getIpAddress(networkInterfaceName)}:8080`);
    } else {
        console.warn(`External: Network interface name '${networkInterfaceName}' is not valid.`);
        console.warn(`          Use one of the following as command line argument:\n`);

        let test = Object.keys(os.networkInterfaces()).forEach(value => {
            console.log(`            - ${value}`);
        });
    }
    console.log('\nUse Ctrl+C to quit this process');
}

function getIpAddress(name) {
    let interface = os.networkInterfaces()[name];
    let result = interface ?
        interface.filter(details => {
            return details.family == 'IPv4';
        }) : [];
    return result.length > 0 ? result[0].address : undefined;
};
