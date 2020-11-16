import { EmployeeService } from './../service/EmployeeService';
import {Router, Request, Response } from 'express';
import Employee from '../model/EmployeeDto';

export class EmployeeController {
    public router: Router = Router();
    private employeeService: EmployeeService = new EmployeeService();
    constructor(){
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get('/get-all', this.getAllEmployee);
        this.router.post('/create', this.insertEmployee);
    }

    public getAllEmployee = (req: Request, res: Response): void => {
        this.employeeService.getAllEmployee()
        .then((employees: Employee[])=>{
            res.json({employees:employees});
        })
        .catch(()=>{
            res.statusCode = 500;
            res.send('error');
        });
    }

    public insertEmployee = (req: Request, res: Response): void => {
        this.employeeService.insertEmployee(req)
        .then((result: any) => {
            res.statusCode = 200;
            res.json({message: 'employee created'});
        })
        .catch(() => {
            res.statusCode = 500;
            res.json({message: 'error in creating employee'});
        })
    }
}