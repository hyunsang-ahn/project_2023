const mongoose = require('mongoose');
module.exports = () => {
  mongoose.set('strictQuery', false);
  mongoose
  .connect(
    'mongodb://127.0.0.1:27017/',
    {
      // useNewUrlPaser: true,
      // useUnifiedTofology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.log(err);
  });
  
  };