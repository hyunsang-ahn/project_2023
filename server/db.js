

// var mongoose = require("mongoose");
// var tunnel = require('tunnel-ssh');
// const dotenv = require('dotenv');

// dotenv.config();

// const ssh_config = {
//   username: process.env.SSH_USER,
//   password: process.env.SSH_PASSWORD,
//   host: process.env.SSH_HOST,
//   port: process.env.SSH_PORT,
//   dstHost: process.env.SSH_DATABASE_HOST,
//   dstPort: process.env.SSH_DATABASE_PORT,
// };



// var server = tunnel(ssh_config, function (error, server) {
//   if (error) {
//     console.log('Error!! ', error);
//   } else {
//     if (server != null) {

//       var Schema = mongoose.Schema;
//       const url = 'mongodb://127.0.0.1:27017/test';
//       var conn = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).connection;

//       console.log(conn);
//       if (mongoose) {
//         mongoose.disconnect();
//       }
//       if (server) {
//         server.close();
//       }
//     }
//   }
// });


// const { createTunnel } = require('tunnel-ssh');



// const port = 27017;

// const tunnelOptions = {
//   autoClose: true
// };
// const serverOptions = {
//   host: '127.0.0.1',
//   port: 27017
// }
// const sshOptions = {
//   host: process.env.SSH_HOST,
//   port: process.env.SSH_PORT,
//   username: process.env.SSH_USER,
//   password: process.env.SSH_PASSWORD,
// };
// const forwardOptions = {
//   srcAddr: '0.0.0.0',
//   srcPort: port,
//   dstAddr: '127.0.0.1',
//   dstPort: port
// };

// createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions).
//   then(([server, conn], error) => {
//     console.log('server=====================', server)
//     server.on('error', (e) => {
//       console.log(e);
//     });

//     conn.on('error', (e) => {
//       console.log(e);
//     });
//   });

const { createTunnel } = require('tunnel-ssh');

// const port = 27017;

// const tunnelOptions = {
//   autoClose: true
// };
// const serverOptions = {
//   port: port
// };
// const sshOptions = {
//   host: process.env.SSH_HOST,
//   port: process.env.SSH_PORT,
//   username: process.env.SSH_USER,
//   password: process.env.SSH_PASSWORD,
// };
// const forwardOptions = {
//   srcAddr: '0.0.0.0',
//   srcPort: port,
//   dstAddr: '127.0.0.1',
//   dstPort: port
// };

// let [server, conn] = await createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions);

// server.on('connection', (connection) => {
//   console.log('new connection');
// });

async function connectToMongoDB() {
  const tunnelOptions = {
    host: process.env.SSH_HOST,
    port: process.env.SSH_PORT,
    username: process.env.SSH_USER,
    password: process.env.SSH_PASSWORD,
    dstPort: 27017,
    localPort: 27017
  };

  const serverOptions = {
    host: 'localhost',
    port: 27017,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const sshOptions = {
    keepAlive: true,
    readyTimeout: 20000,
  };

  const forwardOptions = {
    srcPort: 27017,
    dstHost: 'localhost',
    dstPort: 27017
  };

  const [server, conn] = await createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions);

  // MongoDB에 연결
  const db = conn.db('database-name');
  const collection = db.collection('collection-name');
  const result = await collection.find().toArray();

  // 결과 출력
  console.log('result==========================', result);

  // MongoDB 및 SSH 터널 닫기
  await conn.close();
  await server.close();
}

connectToMongoDB().catch(console.error);