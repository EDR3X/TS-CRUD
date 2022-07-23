import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie {
    title: string;
    director: string;
}

export interface IMovieModel extends IMovie, Document { }

const MovieSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        director: { type: Schema.Types.ObjectId, ref: 'Director', required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IMovieModel>('Movie', MovieSchema);
