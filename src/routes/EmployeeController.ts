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
        this.router.put('/update-manager', this.updateManager);
        this.router.get('/get-employee', this.getEmployee);
    }

    public getAllEmployee = (req: Request, res: Response): void => {
        this.employeeService.getAllEmployee()
        .then((employees: Employee[])=>{
            res.json({employees:employees});
        })
        .catch((err)=>{
            res.statusCode = 500;
            res.json({message: err.message});
        });
    }

    public insertEmployee = (req: Request, res: Response): void => {
        this.employeeService.insertEmployee(req)
        .then(() => {
            res.statusCode = 200;
            res.json({message: 'employee created'});
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json({message: err.message});
        });
    }

    public updateManager = (req: Request, res: Response): void => {
        this.employeeService.updateManager(req.body.empId, req.body.managerId)
        .then(() => {
            res.statusCode = 200;
            res.json({messgae: 'successfully updated'});
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json({message: err.message});
        });
    }

    public getEmployee = (req: Request, res: Response): void => {
        this.employeeService.getEmployee(req.body.empId)
        .then((emp: Employee) => {
            res.statusCode = 200;
            res.json({employee: emp});
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json({messgae: err.message});
        })
    }
}