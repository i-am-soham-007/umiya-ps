import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
    type: 'upload' | 'external_url' | 'youtube_embed';
    url: string;
    filename?: string;
    mimetype?: string;
    size?: number; // size in bytes
    dimensions?: {
        width: number;
        height: number;
    };
    uploadedBy?: mongoose.Schema.Types.ObjectId; // Reference to User
    createdAt: Date;
    updatedAt: Date;
}

const MediaSchema: Schema = new Schema({
    type: {
        type: String,
        enum: ['upload', 'external_url', 'youtube_embed'],
        required: true,
        default: 'upload'
    },
    url: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
    },
    mimetype: {
        type: String,
    },
    size: {
        type: Number,
    },
    dimensions: {
        width: { type: Number },
        height: { type: Number }
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});

export default mongoose.model<IMedia>('Media', MediaSchema);
