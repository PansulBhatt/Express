import express from 'express';
import { readCsvFile } from './utils/utils';

const app = express();

const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  });
  app.use(require('./router'));
}

async function init() {
  console.log('waiting for data to be fetched in variable');
  global.data = await readCsvFile();
  startServer();
}

init();
