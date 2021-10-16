Blog app with microservices architecture and docker and kubernetes configurations.

Introduction:

  1. This app includes creation of posts and creation and moderation of comments related to that particular post.
  2. Built with Node.js and React.js using microservice architecture. 
  3. There is no database attached with this project. Just in-memory storage.
  4. This project has Docker and Kubernetes configurations for deployment.

Requirement:

  1. Node.js
  2. React.js
  3. Docker
  4. Kubernetes

Steps To Run:

  1. Clone the project and cd to the location.
  2. Run following command (npm install) to install the dependencies in client, comments, events, moderation, posts, query folders.
  3. To run locally run all the projects with "npm run start" command in your terminal.
  
Folder Structure:

  1. client => Contains code related to frontend build in React.js
  2. posts => Contains code required to create a post.
  3. comments => Contains code required to create a comment.
  4. events => Contains code for emitting / publishing events to all the services.
  5. query => Contains code to retrive posts and comments.
  6. moderation => Contains logic for moderating a comment.
  7. infra => Contains all the Kubernetes configuration files.

Modules Used:

  1. axios => For making http calls.
  2. cors => For adding required headers.
  3. express => Used as a framework.
  4. nodemon => For development purposes.

Flow of the Project =>

  1. Creation of a post => 
    1) Call goes to post service and emits PostCreated event which goes to event service.
    2) Event service publishes the event to all the service.
    3) If the event is relevant to any service it takes action on that event in this case Query service for storing the posts data.
    
  2. Creation of a comment => 
    1) Call goes to comments service and emits CommentCreated event which goes to event service.
    2) Event service publishes the event to all the service.
    3) If the event is relevant to any service it takes action on that event in this case Query service for storing the comments data and Moderation service for moderating comment.
