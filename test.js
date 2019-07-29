const message = Buffer.from('400|lolololol');
const client = dgram.createSocket('udp4');

function myFunction() {
    console.log("Sending")
    client.send(message, 8888, '192.168.1.108', (err) => {
        client.close();
    });
}
