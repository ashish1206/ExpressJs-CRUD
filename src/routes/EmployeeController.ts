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
        this.router.get('/get-emp-by-manager', this.getEmployeesByManagerId);
        this.router.get('/get-manager-by-emp', this.getManagerByEmpId);
        this.router.delete('/delete-employee', this.deleteEmployee);
    }

    private getAllEmployee = (req: Request, res: Response): void => {
        this.employeeService.getAllEmployee()
        .then((employees: Employee[])=>{
            res.statusCode = 200;
            res.json({employees:employees});
        })
        .catch((err)=>{
            res.statusCode = 500;
            res.json({message: err.message});
        });
    }

    private insertEmployee = (req: Request, res: Response): void => {
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

    private updateManager = (req: Request, res: Response): void => {
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

    private getEmployee = (req: Request, res: Response): void => {
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

    private getEmployeesByManagerId = (req: Request, res: Response): void => {
        const managerId: any = req.query.managerId;
        this.employeeService.getEmployeesByManagerId(parseInt(managerId))
        .then((employeeList: Employee[]) => {
            res.statusCode = 200;
            res.json({employees: employeeList});
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json({message: err.message});
        })
    }

    private getManagerByEmpId = (req: Request, res: Response): void => {
        const empId: any = req.query.empId;
        this.employeeService.getManagerByEmpId(parseInt(empId))
        .then((manager: Employee) => {
            res.statusCode = 200;
            res.json({manager: manager});
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json({message: err.message});
        })
    }

    private deleteEmployee = (req: Request, res: Response): void => {
        const empId: any = req.query.empId;
        this.employeeService.deleteEmployee(parseInt(empId))
        .then(() => {
            res.statusCode = 200;
            res.json({message: 'deleted successfully'});
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json({message: err.message});
        })
    }
}