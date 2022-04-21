if (!process.env.ALREADY_SET) { require('dotenv').config(); }

import * as http from 'http';
import { app } from './app';
import { DatabaseService } from '../src/services/databaseService';

DatabaseService.getConnection().then(() => {
  const server = http.createServer(app).listen(parseInt(process.env.PORT || '3000', 10));
  server.on('listening', async () => {
    console.log('info', `Sample app listening on ${JSON.stringify(server.address())}`);
  });
  console.log('info', `Sample app listening on ${JSON.stringify(server.address())}`);
})