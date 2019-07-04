import express from 'express';
const app = express();

app.get('/peopleLikeYou', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: [{
        name: 'Hello'
    }]
  })
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});