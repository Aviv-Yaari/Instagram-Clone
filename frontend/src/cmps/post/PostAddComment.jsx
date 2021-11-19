import { useState } from 'react';
import { ReactComponent as SmileyIcon } from '../../assets/svg/smiley.svg';

export function PostAddComment({ postId, onAddComment }) {
  const [comment, setComment] = useState('');

  const handleChange = ev => {
    setComment(ev.target.value);
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    onAddComment(postId, comment);
    setComment('');
  };

  return (
    <form className="post-add-comment flex align-center" onSubmit={handleSubmit}>
      <SmileyIcon />
      <input value={comment} onChange={handleChange} type="text" placeholder="Add a comment..." className="grow" />
      <button className={`btn-link ${comment.length ? '' : 'disabled'}`}>Post</button>
    </form>
  );
}
