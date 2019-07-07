import express from 'express';
import { readCsvFile } from './utils/utils';

const app = express();

// Heroku dynamically assigns our app a port, so we can't set the port to a fixed number.
// Fortunately, Heroku adds the port to the env, so we can pull it from there otherwise we would listen on port 5000.
const PORT = process.env.PORT || 5000;

const startServer = () => {
  // Start listening on the assigned port
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  });
  app.use(require('./router'));
}

async function init() {
  /**
   * Our approach here is to wait for the data to be fetched from the data.csv file and then start the listening for requests.
   * This approach would allow us to save the data in a global variable which can then be accessed by different functions.
   */
  console.log('waiting for data to be fetched in variable');
  global.data = await readCsvFile();
  startServer();
}

init();
