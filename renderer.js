const dgram = require('dgram');
const server = dgram.createSocket('udp4');

function myFunction() {
    const message = Buffer.from(document.getElementById("message").value);
    const ip = Buffer.from(document.getElementById("espip").value);

    console.log("Sending:s " + message)
    server.send(message, 8888, ip.toString());
}