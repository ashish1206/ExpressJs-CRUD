import { Router, Request, Response } from 'express';
import { TaskService } from './../service/TaskService';
import Task, { ITask } from './../model/TaskDto'

export class TaskController {
    public router: Router = Router();
    private taskService: TaskService;
    constructor(){
        this.taskService = new TaskService();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get('/get-task', this.getTaskDetails);
        this.router.post('/create-task', this.createTask);
        this.router.put('/update-task', this.updateTask);
    }

    private getTaskDetails = (req: Request, res: Response) => {
        const taskId: any = req.query.taskId;
        this.taskService.getTaskDetails(parseInt(taskId))
        .then((task: Task) => {
            res.statusCode = 200;
            res.json({task: task});
        })
        .catch((err: any) => {
            res.statusCode = 500;
            res.json({message: err.message});
        })
    }

    private createTask = (req: Request, res: Response) => {
        this.taskService.createTask(req)
        .then(() => {
            res.statusCode = 200;
            res.json({messgae: 'task created'});
        })
        .catch((err: any) => {
            res.statusCode = 500;
            res.json({message: err.message});
        })
    }

    private updateTask = (req: Request, res: Response) => {
        this.taskService.updateTask(req)
        .then(() => {
            res.statusCode = 200;
            res.json({messgae: 'updated successfully'});
        })
        .catch((err: any) => {
            res.statusCode = 500;
            res.json({message: err.message});
        })
    }
}