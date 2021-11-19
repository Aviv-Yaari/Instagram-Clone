import { ReactComponent as LikeIcon } from '../../assets/svg/activity-feed.svg';
import { ReactComponent as LikeIconActive } from '../../assets/svg/heart-red.svg';
import { ReactComponent as CommentIcon } from '../../assets/svg/comment.svg';
import { ReactComponent as ShareIcon } from '../../assets/svg/share.svg';
import { useSelector } from 'react-redux';

export function PostActions({ post, onLikePost }) {
  const { _id, likes } = post;
  const user = useSelector(state => state.userModule.user);
  console.log(post.likes);
  return (
    <section className="actions flex align-center">
      <button onClick={() => onLikePost(_id)}>{likes.includes(user?._id) ? <LikeIconActive /> : <LikeIcon />}</button>
      <button>
        <CommentIcon />
      </button>
      <button>
        <ShareIcon />
      </button>
    </section>
  );
}
