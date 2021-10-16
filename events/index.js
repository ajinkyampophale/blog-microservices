const express = require('express'),
  cors = require('cors'),
  axios = require('axios'),
  app = express();

app.use(express.json());
app.use(cors());

const events = [];

app.get('/events', (req, res) => {

  res.send(events);
});

app.post('/events', (req, res) => {

  const event = req.body;

  events.push(event);

  axios.post('http://posts-clusterip-srv:4000/events', event).catch(err => console.log(err.message));

  axios.post('http://comments-srv:4001/events', event).catch(err => console.log(err.message));

  axios.post('http://query-srv:4002/events', event).catch(err => console.log(err.message));

  axios.post('http://moderation-srv:4003/events', event).catch(err => console.log(err.message));

  console.log("Event emitted successfully ", event.type);

  res.json({status: "OK"});
});

const port = 4005;
app.listen(port, () => {
  console.log(`Listening on ${port} port`);
});