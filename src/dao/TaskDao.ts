import { DaoError } from './../errors/DaoError';
import { employeeQueries } from './EmployeeDaoQueries';
import { DbConnection } from './../dbconnection';
import { Pool } from 'pg';
import Task, { ITask } from '../model/TaskDto';


export class TaskDao {
    private pool: Pool;
    constructor(){
        this.pool = new DbConnection().dbConnection();
    }

    public getTaskDetails = async (taskId: number): Promise<Task> => {
        try{
            const params: any[] = [taskId];
            const result = await this.pool.query(employeeQueries.getTaskDetails, params);
            const task: Task = await this.populateTaskDetails(result);
            return task;
        }
        catch(err){
            throw new DaoError('Error in fetching task details');
        }
    }

    private populateTaskDetails = async (result: any): Promise<Task> => {
        try{
            const row: any = result.rows[0];
            let task: ITask = {
                taskId: row.task_id,
                description: row.description,
                createDate: row.create_date,
                updateDate: row.update_date,
                status: row.status,
                details: row.details,
                empId: row.emp_id
            };
            return new Task(task);
        }
        catch(err){
            throw new DaoError('Error in populating task details');
        }
    }

    public createTask = async (task: Task): Promise<number> => {
        try{
            const params: any[] = [task.description, task.status, task.details, task.empId];
            const result: any = await this.pool.query(employeeQueries.createTask, params);
            return result.rowCount;
        }
        catch(err){
            throw new DaoError('Error in creating new task');
        }
    }

    public updateTask = async (task: Task): Promise<number> => {
        try{
            const params: any[] = [task.details, task.status, task.taskId];
            const result = await this.pool.query(employeeQueries.updateTask, params);
            return result.rowCount;
        }
        catch(err){
            throw new DaoError('Error in updateing task');
        }
    }

    public getAllTasksByEmpId = async (empId: number): Promise<Task[]> => {
        try{
            const params: any[] = [empId];
            const result = await this.pool.query(employeeQueries.getAllTaskByEmp, params);
            const tasks: Task[] = await this.populateTasks(result);
            return tasks;
        }
        catch(err){
            throw new DaoError('Error in fetching all task for emp');
        }
    }

    private populateTasks = async (result: any): Promise<Task[]> => {
        try{
            let tasks: Task[] = [];
            result.rows.forEach((row: any) => {
                let task: ITask = {
                    taskId: row.task_id,
                    description: row.description,
                    createDate: row.create_date,
                    updateDate: row.update_date,
                    status: row.status,
                    details: row.details,
                    empId: row.emp_id
                };
                tasks.push(task);
            });
            return tasks;
        }
        catch(err){
            throw new DaoError('Error in populating tasks');
        }
    }

    public getAllTaskByManager = async (managerId: number): Promise<Task[]> => {
        try{
            const params: any[] = [managerId];
            const result = await this.pool.query(employeeQueries.getAllTaskByManager, params);
            const tasks: Task[] = await this.populateTasks(result);
            return tasks;
        }
        catch(err){
            throw new DaoError('Error in fetching all task by managerId');
        }
    }
}