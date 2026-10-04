import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  type: 'post' | 'page';
  content: string;
  status: 'draft' | 'published';
  author: mongoose.Schema.Types.ObjectId;
  featuredImage?: string;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, enum: ['post', 'page'], default: 'post' },
    content: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    featuredImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>('Post', PostSchema);
