import { IReviews } from './model';
import reviews from './schema';

export default class PostService {
    
    public async createReview(post_params: IReviews): Promise<IReviews> {
        try {
            const session = new reviews(post_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterReview(query: any): Promise<IReviews | null> {
        try {
            return await reviews.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async deleteReviews(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await reviews.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }
}