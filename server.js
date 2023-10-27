const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const database = require('./utils/database');

//Database configuration

database();
app = require('./app');
const port = 3000;
const hostname = 'localhost'
const server = app.listen(port, hostname, () => {
  console.log(`The port ${port} is listening...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION Shuting down');
  server.close(() => {
    process.exit(1);
  });
});
console.log(process.env.NODE_ENV);
