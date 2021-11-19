interface PostMedia {
  type: 'image' | 'video';
  src: string;
}
interface PostComment {
  by: ObjectID;
  text: string;
}
interface Post {
  _id?: ObjectID;
  userId: ObjectID;
  media: PostMedia[];
  text: string;
  likes: ObjectID[] | [];
  comments: PostComment[] | [];
}
import { User } from '../../api/user/user.service';
// const { getCollection } = require('../../services/db.service');
import { Document, ObjectID } from 'bson';
import { getCollection } from '../../services/db.service';
const { ObjectId } = require('mongodb');

async function query(filterBy: { _id?: string } = {}) {
  const collection = await getCollection('post');
  const posts = await collection
    .aggregate([
      { $match: filterBy._id ? { _id: ObjectId(filterBy._id) } : {} },
      {
        $lookup: {
          from: 'user',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      { $project: { 'user.password': 0 } },
    ])
    .toArray();
  const userCollection = await getCollection('user');
  for (const post of posts) {
    post.createdAt = (post._id as ObjectID).getTimestamp();
    for (const comment of post.comments) {
      const user = <User>await userCollection.findOne({ _id: ObjectId(comment.by) });
      comment.by = user.username;
    }
  }
  return posts;
}

async function remove(id: string) {
  const posts = await getCollection('post');
  return await posts.deleteOne({ _id: ObjectId(id) });
}

async function add(media: PostMedia[], text: string, userId: string) {
  const post: Post = { userId: ObjectId(userId), media, text, likes: [], comments: [] };
  const posts = await getCollection('post');
  const { insertedId } = await posts.insertOne(post);
  const addedPost = await query({ _id: insertedId.toString() });
  return addedPost[0];
}

async function update(post: Document, id: string) {
  delete post._id;
  const posts = await getCollection('post');
  await posts.updateOne({ _id: ObjectId(id) }, { $set: post });
  return post;
}

async function toggleLike(userId: string, postId: string) {
  if (!userId || !postId) throw 'No user id / post id';
  const posts = await getCollection('post');
  const post = <Post>await posts.findOne({ _id: ObjectId(postId) });
  if (!post) throw 'Post does not exist';
  if (post.likes.length && post.likes.find(like => like.toString() === userId)) {
    await posts.updateOne({ _id: ObjectId(postId) }, { $pull: { likes: ObjectId(userId) } });
  } else {
    await posts.updateOne({ _id: ObjectId(postId) }, { $addToSet: { likes: ObjectId(userId) } });
  }
  const updatedPost = await query({ _id: postId });
  return updatedPost[0];
}

async function addComment(userId: string, postId: string, comment: string, commentId: string) {
  const posts = await getCollection('post');
  await posts.updateOne(
    { _id: ObjectId(postId) },
    { $push: { comments: { id: commentId, by: ObjectId(userId), text: comment } } }
  );
  const post = await query({ _id: postId });
  return post[0];
}

export const postService = { query, remove, add, update, toggleLike, addComment };
