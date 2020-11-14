import {Router, Request, Response} from 'express';

export class UserController {
    public router = Router();
    constructor(){
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get('/login', this.user);
    }

    private user(req: Request, res: Response): void {
        res.send('hello world');
    }
}