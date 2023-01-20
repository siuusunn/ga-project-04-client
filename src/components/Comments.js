import moment from 'moment';
import { useState, useEffect } from 'react';
import { API } from '../lib/api';
import '../styles/Comments.scss';

export default function Comments() {
  const [comments, setComments] = useState(null);
  const [commentField, setCommentField] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setCommentField({ ...commentField, [e.target.name]: e.target.value });
    console.log(commentField);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.allComments, commentField, API.getHeaders());
    setIsUpdated(true);
  };

  useEffect(() => {
    API.GET(API.ENDPOINTS.allComments)
      .then(({ data }) => setComments(data))
      .catch((error) => console.error(error));
  }, [comments, isUpdated]);

  console.log(comments);

  return (
    <>
      <div className='comments-container-div'>
        <h2>Chats</h2>
        <div className='comments-display-div'>
          {comments?.map((comment) => (
            <div>
              <strong>{comment.owner.username}</strong>: {comment.text} at{' '}
              <em>{moment(comment.created_at).fromNow()}</em>
            </div>
          ))}
        </div>
        <label for='text'>Comment:</label>
        <input
          type='text'
          id='text'
          name='text'
          onChange={handleChange}
        ></input>
        <button type='submit' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}
