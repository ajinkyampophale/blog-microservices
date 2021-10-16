import React from "react";

const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {

    let {id, content, status} = comment;

    if(status === 'pending'){
      content = 'This comment is awaiting moderation';
    }
    else if(status === 'rejected'){
      content = 'This comment is rejected';
    }

    return <li key={id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
