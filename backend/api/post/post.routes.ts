const express = require('express');
import { getPosts, addPost, toggleLike, updatePost, deletePost, getById, addComment } from './post.controller';
const router = express.Router();

router.get('/', getPosts);
router.post('/', addPost);
router.put('/:id/like', toggleLike);
router.post('/:id/comment', addComment);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/:id', getById);

module.exports = router;
