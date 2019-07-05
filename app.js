import express from 'express';
import { readCsvFile, computeQueryScore, calculateScore } from './utils.js';
const app = express();

app.get('/people-like-you', (req, res) => {
  const query = computeQueryScore(req);
  const data = calculateScore(global.data, query);
  res.status(200).send({
    success: 'true',
    message: 'peopleLikeYou Response',
    peopleLikeYou: data.sort((a, b) => { return b.score - a.score; }).slice(0, 10)
  })
});

const PORT = 5000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  });
}

async function init() {
  console.log('waiting for data to be fetched in variable');
  global.data = await readCsvFile();
  startServer();
}

init();
