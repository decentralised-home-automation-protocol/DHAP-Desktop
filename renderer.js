var parseString = require('xml2js').parseString;
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

function myFunction() {
    const message = Buffer.from(document.getElementById("message").value);
    const ip = Buffer.from(document.getElementById("espip").value);
    const port = Buffer.from(document.getElementById("port").value);

    console.log("Sending:s " + message)
    server.send(message, port, ip.toString());
}

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    // console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

    var xml = msg.toString().slice(4)
    parseString(xml, function (err, result) {
        console.dir(result);
        console.dir(result.device.group[0].name[0]);
    });
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(1030)
