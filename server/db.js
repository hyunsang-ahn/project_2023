const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoose = require('mongoose');
module.exports = () => {
  //실서버
  // mongoose.set('strictQuery', false);
  // mongoose
  // .connect(
  //   'mongodb://127.0.0.1:27017/',
  // )
  // .then(() => console.log('MongoDB connected'))
  // .catch((err) => {
  //   console.log(err);
  // });



  // //개발일때
  // const uri = `mongodb+srv://${process.env.MONGOID}:${process.env.MONGOPW}@cluster0.avuqeyr.mongodb.net/?retryWrites=true&w=majority`;
  // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });









  // client.connect(err => {
  //   const collection = client.db("test").collection("users");
  //   console.log('collection======================', collection)
  //   // perform actions on the collection object
  //   client.close();
  // })
  mongoose.connect(process.env.MONGO_URI, {
    useMongoClient: true,
    strictQuery: false
  }).then(
    (response) => {
      console.log('Successfully connected to mongodb');
    }
  ).catch(e => {
    console.error(e);
  });
  console.log('MongoDB connected')




};