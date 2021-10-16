const express = require('express'),
  cors = require('cors'),
  {randomBytes} = require('crypto'),
  axios = require('axios'),
  app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {

  res.send(posts);
});

app.post('/posts/create', async (req, res) => {

  const {title} = req.body;

  const postId = randomBytes(4).toString('hex');

  const postData = {id: postId, title};
  posts[postId] = postData;

  await axios.post('http://event-bus-srv:4005/events', {
    type: "PostCreated",
    data: postData
  });

  console.log("Post created successfully");

  res.send(postData);
});

app.post('/events', (req, res) => {

  console.log("Event Received ", req.body.type);

  res.send({});
});

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on ${port} port`);
});