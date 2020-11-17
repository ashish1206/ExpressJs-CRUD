import { Request } from 'express';
import { ServiceError } from './../errors/ServiceError';
import { TaskDao } from './../dao/TaskDao';
import Task, { ITask } from '../model/TaskDto';
import { promises } from 'fs';

export class TaskService {
    private taskDao: TaskDao;

    constructor(){
        this.taskDao = new TaskDao();
    }

    public getTaskDetails = async (taskId: number): Promise<Task> => {
        try{
            return this.taskDao.getTaskDetails(taskId);
        }
        catch(err){
            throw new ServiceError('Error in getting task details');
        }
    }

    public createTask = async (req: Request): Promise<void> => {
        try{
            const task: ITask = {
                taskId: undefined,
                description: req.body.description,
                details: req.body.details,
                createDate: undefined,
                updateDate:undefined,
                empId: req.body.empId,
                status: req.body.status
            };
            const rowCount = await this.taskDao.createTask(task);
            if(rowCount == 0){
                throw new ServiceError('Error in creating new task');
            }
        }
        catch(err){
            throw new ServiceError('Error in creating new Task');
        }
    }

    public updateTask = async (req: Request): Promise<void> => {
        try{
            const task: ITask = {
                taskId: req.body.taskId,
                description: undefined,
                details: req.body.details,
                createDate: undefined,
                updateDate:undefined,
                empId: undefined,
                status: req.body.status
            };
            const row = await this.taskDao.updateTask(task);
            if(row == 0){
                throw new ServiceError('Error in updating task');
            }
        }
        catch(err){
            throw new ServiceError('Error in updating task');
        }
    }
}