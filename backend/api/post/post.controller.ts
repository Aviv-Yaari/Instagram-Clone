import { Request, Response } from 'express';
import { postService } from './post.service';

async function getPosts(req: Request, res: Response) {
  try {
    const posts = await postService.query();
    res.send(posts);
  } catch (err) {
    console.error('Error in get posts', err);
    res.status(500).send({ err: 'Failed to get posts' });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const postId = req.params.id;
    const post = await postService.query({ _id: postId });
    res.send(post);
  } catch (err) {
    console.error('Error in get post by id', err);
    res.status(500).send({ err: 'Failed to get post' });
  }
}

async function deletePost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await postService.remove(id);
    res.send({ msg: 'Deleted successfully' });
  } catch (err) {
    console.error('Error in delete post', err);
    res.status(500).send({ err: 'Failed to delete post' });
  }
}

async function addPost(req: Request, res: Response) {
  try {
    const { media, text } = req.body;
    const { userId } = req.session;
    if (!userId) throw 'Not logged in';
    const post = await postService.add(media, text, userId);
    res.send(post);
  } catch (err) {
    console.error('Error in add post', err);
    res.status(500).send({ err: 'Failed to add post' });
  }
}

async function updatePost(req: Request, res: Response) {
  try {
    const post = req.body;
    const { id } = req.params;
    const updatedPost = await postService.update(post, id);
    res.json(updatedPost);
  } catch (err) {
    console.error('Error in update post', err);
    res.status(500).send({ err: 'Failed to update post' });
  }
}

async function toggleLike(req: Request, res: Response) {
  try {
    const { userId } = req.session;
    const { id } = req.params;
    if (!userId) throw 'Not logged in';
    const updatedPost = await postService.toggleLike(userId, id);
    res.json(updatedPost);
  } catch (err) {
    console.error('Error in update post:', err);
    res.status(500).send({ err });
  }
}

async function addComment(req: Request, res: Response) {
  try {
    const { userId } = req.session;
    if (!userId) throw 'Not logged in';
    const { id: postId } = req.params;
    const { commentId, comment } = req.body;
    const updatedPost = await postService.addComment(userId, postId, comment, commentId);
    res.json(updatedPost);
  } catch (err) {
    console.error('Error in add comment:', err);
    res.status(500).send({ err });
  }
}

export { getPosts, deletePost, addPost, updatePost, getById, toggleLike, addComment };
