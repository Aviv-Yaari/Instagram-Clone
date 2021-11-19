export function PostComments({ comments }) {
  return (
    <section>
      {comments.map(comment => (
        <article key={comment.id} className="comment">
          <span className="bold">{comment.by} </span>
          {comment.text}
        </article>
      ))}
    </section>
  );
}
