import * as mongoose from 'mongoose';

export interface IReviews {
    title: String;
    content: String;
    stars_number: Number;
    author: mongoose.Types.ObjectId[]; // Reference to the User collection
}