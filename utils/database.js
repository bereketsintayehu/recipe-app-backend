module.exports = ()=>{
    const mongoose = require('mongoose');
    mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database connected successfuly');
  })
}