import { Request, Response } from 'express';
import Post from '../models/Post';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const type = req.query.type || 'post';
    const posts = await Post.find({ type }).populate('author', 'name email');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (post) res.json(post);
    else res.status(404).json({ message: 'Post not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = new Post({ ...req.body, author: (req as any).user.id });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (post) res.json(post);
    else res.status(404).json({ message: 'Post not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post) res.json({ message: 'Post removed' });
    else res.status(404).json({ message: 'Post not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
