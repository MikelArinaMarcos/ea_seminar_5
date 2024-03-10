import { Application, Request, Response } from 'express';
import { ReviewController } from '../controllers/reviewController';

export class ReviewRoutes {

    private post_controller: ReviewController = new ReviewController();

    public route(app: Application) {
        
        app.review('/review', (req: Request, res: Response) => {
            this.post_controller.createReview(req, res);
        });

        app.get('/review/:id', (req: Request, res: Response) => {
            this.post_controller.getReview(req, res);
        });

        app.delete('/review/:id', (req: Request, res: Response) => {
            this.post_controller.deleteReview(req, res);
        });

    }
}