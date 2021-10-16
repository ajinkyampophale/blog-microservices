const express = require('express'),
  cors = require('cors'),
  {randomBytes} = require('crypto'),
  axios = require('axios'),
  app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {

  const post = commentsByPostId[req.params.id];

  res.send(post);
});

app.post('/posts/:id/comments', async (req, res) => {

  const postId = req.params.id;
  const {content} = req.body;
  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostId[postId] || [];
  const status = 'pending';

  comments.push({id: commentId, content, status});

  commentsByPostId[postId] = comments;

  await axios.post('http://event-bus-srv:4005/events', {
    type: "CommentCreated",
    data: {
      id: commentId, 
      content,
      postId,
      status
    }
  });

  console.log("Comment created successfully");

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {

  console.log("Event Received ", req.body.type);

  res.send({});
});

const port = 4001;
app.listen(port, () => {
  console.log(`Listening on ${port} port`);
});