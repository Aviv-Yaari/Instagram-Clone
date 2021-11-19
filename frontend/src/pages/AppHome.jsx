import { useEffect, useState } from 'react';
import { PostList } from '../cmps/app-home/PostList';
import { StoryList } from '../cmps/app-home/StoryList';
import { postService } from '../services/postService';
import data from '../data.json';
import { utilService } from '../services/util.service';
import { CreatePost } from '../cmps/CreatePost';
import { AppHeader } from '../cmps/AppHeader';

export function AppHome() {
  const [posts, setPosts] = useState(null);
  const [isAddingPost, setIsAddingPost] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await postService.query();
      setPosts(posts);
    };
    getPosts();
  }, []);

  const handleLikePost = async id => {
    try {
      const updatedPost = await postService.like(id);
      setPosts(posts => posts.map(post => (post._id === updatedPost._id ? updatedPost : post)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (id, comment) => {
    try {
      const commentId = utilService.makeId();
      const updatedPost = await postService.addComment(id, comment, commentId);
      setPosts(posts => posts.map(post => (post._id === updatedPost._id ? updatedPost : post)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadPost = async (url, text) => {
    try {
      const media = [{ type: 'image', src: url }];
      const addedPost = await postService.add(media, text);
      setPosts(posts => [addedPost, ...posts]);
      setIsAddingPost(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isAddingPost && <CreatePost onClose={() => setIsAddingPost(false)} onUploadPost={handleUploadPost} />}
      <AppHeader onNewPost={() => setIsAddingPost(true)} />
      <main className="app-home flex space-between">
        <div>
          <StoryList stories={data.stories} />
          {posts && <PostList posts={posts} onLikePost={handleLikePost} onAddComment={handleAddComment} />}
        </div>
        <div>Suggestions</div>
      </main>
    </>
  );
}
