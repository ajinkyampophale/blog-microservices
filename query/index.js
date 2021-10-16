const express = require('express'),
  cors = require('cors'),
  axios = require('axios'),
  app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {

  if(type === 'PostCreated'){
    const {id, title} = data;

    posts[id] = {id, title, comments: []};
  }
  
  if(type === 'CommentCreated'){
    const {id, content, status, postId} = data;

    const comments = posts[postId].comments;

    comments.push({
      id, content, status
    });
  }

  if(type === 'CommentUpdated'){
    const {id, content, status, postId} = data;

    const comments = posts[postId].comments;
    const comment = comments.find(ele => ele.id === id);

    comment.content = content;
    comment.status = status;
  }
}

app.get('/query', (req, res) => {

  res.send(posts);
});

app.post('/events', async (req, res) => {

  const {type, data} = req.body;

  console.log("Event Received ", type);

  handleEvents(type, data);

  res.send({});
});

const port = 4002;
app.listen(port, async () => {
  console.log(`Listening on ${port} port`);

  try {
    
    const events = await axios.get('http://event-bus-srv:4005/events');

    console.log(events.data);

    for(const event of events.data){
      let {type, data} = event;

      console.log("Processing event ", type);

      handleEvents(type, data);
    }

  } catch (err) {
    console.log(err);
  }
});