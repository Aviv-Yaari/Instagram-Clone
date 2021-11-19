import { PostPreview } from './PostPreview';

export function PostList({ posts, onLikePost, onAddComment }) {
  return (
    <section className="post-list flex column">
      {posts.map(post => (
        <PostPreview key={post._id} post={post} onLikePost={onLikePost} onAddComment={onAddComment} />
      ))}
    </section>
  );
}
