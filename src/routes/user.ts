import { UserService } from './../service/userService';
import {Router, Request, Response} from 'express';

export class UserController {
    public router: Router = Router();
    private userService: UserService = new UserService();
    constructor(){
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get('/login', this.user);
    }

    public user = (req: Request, res: Response): void => {
        this.userService.getUser()
        .then((user)=>{
            res.send(user);
        })
        .catch(()=>{
            res.send('error');
        })
    }
}