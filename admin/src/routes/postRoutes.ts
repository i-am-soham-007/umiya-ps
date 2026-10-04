import express from 'express';
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/postController';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;
