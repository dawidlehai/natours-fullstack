const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.error(err.name, err.message);
  console.log('Uncaught exception! Shutting down...');
  process.exit(1);
});

const app = require('./app');

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(db)
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => console.log('Error:', err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.error(err.name, err.message);
  console.log('Unhandled rejection! Shutting down...');
  server.close(() => process.exit(1));
});
