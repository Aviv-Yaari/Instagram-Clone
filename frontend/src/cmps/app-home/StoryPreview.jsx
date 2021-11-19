import { Link } from 'react-router-dom';
import StoryFrameImg from '../../assets/img/story-frame.png';
import { Avatar } from '../shared/Avatar';

export function StoryPreview({ id, user, onClick }) {
  return (
    <Link className="story-preview flex column" to={`/stories/${user.username}/${id}/`}>
      <Avatar className="img-avatar" src={user.img} alt={user.username} width={56} height={56} />
      <img className="img-frame" src={StoryFrameImg} alt="frame" />
      <span>{user.username}</span>
    </Link>
  );
}
