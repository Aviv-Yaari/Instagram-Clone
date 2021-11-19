import { Avatar } from '../shared/Avatar';
import { ReactComponent as MoreIcon } from '../../assets/svg/more.svg';
import { PostActions } from '../post/PostActions';
import { PostComments } from '../post/PostComments';
import { PostAddComment } from '../post/PostAddComment';
import { PostTime } from '../post/PostTime';
import { Container } from '../shared/Container';

export function PostPreview({ post, onLikePost, onAddComment }) {
  const { _id, user, media, text, likes, comments, createdAt } = post;
  return (
    <Container className="post-preview">
      <header className="post-header flex align-center">
        <Avatar src={user.imgUrl} alt={user.username} width={32} height={32} />
        <span className="username bold">{user.username}</span>
        <MoreIcon className="icon-more" />
      </header>
      <img className="full media" src={media[0].src} alt="" />
      <main className="main flex column">
        <PostActions post={post} onLikePost={onLikePost} />
        <section className="bold">
          {likes.length} {likes.length === 1 ? 'like' : 'likes'}
        </section>
        <div>
          <span className="bold">{user.username}</span> <span>{text}</span>
        </div>
        <PostComments comments={comments} />
        <PostTime createdAt={createdAt} />
        <PostAddComment postId={_id} onAddComment={onAddComment} />
      </main>
    </Container>
  );
}
