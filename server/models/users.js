
const mongoose = require('mongoose')
const { createTunnel } = require('tunnel-ssh');
const port = 27017;

const tunnelOptions = {
    autoClose: true
};
const serverOptions = {
    port: port
};
const sshOptions = {
    host: process.env.SSH_HOST,
    port: process.env.SSH_PORT,
    username: process.env.SSH_USER,
    password: process.env.SSH_PASSWORD,
};
const forwardOptions = {
    srcAddr: '0.0.0.0',
    srcPort: port,
    dstAddr: '127.0.0.1',
    dstPort: port
};
const MongoClient = require('mongodb').MongoClient;
const mongodbUrl = 'mongodb://localhost:27017';

createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions).
    then(async ([server, conn], error) => {
        const connect_db = await MongoClient.connect(mongodbUrl);
        const data = await connect_db.db('test').collection('users').find().toArray()

        console.log('connect done')


        await server.on('error', (e) => {
            console.log(e);
        });

        await conn.on('error', (e) => {
            console.log(e);
        });


        return data
    });
