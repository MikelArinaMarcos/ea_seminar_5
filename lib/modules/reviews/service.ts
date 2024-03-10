import { IReview } from './model';
import reviews from './schema';
import { Types } from 'mongoose';

export default class PostService {
    
    public async createReview(post_params: IReview): Promise<IReview> {
        try {
            const session = new reviews(post_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterReview(query: any): Promise<IReview | null> {
        try {
            return await reviews.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async deleteReview(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await reviews.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }
}