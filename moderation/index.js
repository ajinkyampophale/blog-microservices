const express = require('express'),
  axios = require('axios'),
  app = express();

app.use(express.json());

app.post('/events', async (req, res) => {

  const {type, data} = req.body;

  console.log("Event Received ", type);
  
  if(type === 'CommentCreated'){
    const {id, content, postId} = data;

    const status = content.includes('orange') ? 'rejected' : 'approved';
    
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id, content, status, postId
      }
    });
  }

  res.send({});
});

const port = 4003;
app.listen(port, () => {
  console.log(`Listening on ${port} port`);
});