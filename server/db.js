
// const mongoose = require('mongoose')
// const { createTunnel } = require('tunnel-ssh');
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
// const MongoClient = require('mongodb').MongoClient;
// const mongodbUrl = 'mongodb://localhost:27017';

// createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions).
//   then(async ([server, conn], error) => {
//     const connect_db = await MongoClient.connect(mongodbUrl);
//     const collection = await connect_db.db('test').collection('users').find().toArray()

//     console.log('connect done')

//     console.log('collection====', collection)

//     await server.on('error', (e) => {
//       console.log(e);
//     });

//     await conn.on('error', (e) => {
//       console.log(e);
//     });


//     return connect_db
//   });
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@personalcluster.qbia533.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


console.log('err========================',)





async function run() {
  try {
    console.log("connecting...");
    await client.connect();
    console.log("connected...");
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);





module.exports = client