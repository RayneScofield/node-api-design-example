// const http = require('http');
// const server = http.createServer(async (req, res) => {
//   // router
//   if (req.method === 'GET' && req.url === '/') {
//     console.log('hello from server.');
//     res.end();
//   }
// });

// server.listen(3001, () => {
//   console.log('server on http://localhost:3001');
// });

// const app = require('./server');
import * as dotenv from 'dotenv';
import app from './server';
dotenv.config();

app.listen(3001, () => {
  console.log('server on http://localhost:3001');
});
