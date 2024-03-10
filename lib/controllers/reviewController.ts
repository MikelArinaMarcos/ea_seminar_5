import { Request, Response } from 'express';
import { IReview } from '../modules/reviews/model';
import ReviewService from '../modules/reviews/service';
import UserService from '../modules/users/service';
import e = require('express');

export class ReviewController {

    private review_service: ReviewService = new ReviewService();
    private user_service: UserService = new UserService();

    public async createReview(req: Request, res: Response) {
        try{
            // this check whether all the filds were send through the request or not
            if (req.body.title && req.body.content && req.body.stars_number && req.body.author){
                const post_params:IReview = {
                    title: req.body.title,
                    content: req.body.content,
                    stars_number: req.body.stars_number,
                    author: req.body.author
                };
                const review_data = await this.review_service.createReview(post_params);
                 // Now, you may want to add the created review's ID to the user's array of reviews
                await this.user_service.addReviewToUser(req.body.author, review_data._id); //
                return res.status(201).json({ message: 'Review created successfully', review: review_data });
            }else{            
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getReview(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const post_filter = { _id: req.params.id };
                // Fetch user
                const review_data = await this.review_service.filterReview(review_filter);
                // Send success response
                return res.status(200).json({ data: review_data, message: 'Successful'});
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteReview(req: Request, res: Response) {
        try {
            if (req.params.id) {
                // Delete review
                const delete_details = await this.review_service.deleteReview(req.params.id);
                if (delete_details.deletedCount !== 0) {
                    // Send success response if user deleted
                    return res.status(200).json({ message: 'Successful'});
                } else {
                    // Send failure response if user not found
                    return res.status(400).json({ error: ' not found' });
                }
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing Id' });
            }
        } catch (error) {
            // Catch and handle any errors
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}