import { Employee } from './../model/EmployeeDto';
import { EmployeeService } from './../service/EmployeeService';
import {Router, Request, Response} from 'express';

export class EmployeeController {
    public router: Router = Router();
    private employeeService: EmployeeService = new EmployeeService();
    constructor(){
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get('/login', this.getAllEmployee);
    }

    public getAllEmployee = (req: Request, res: Response): void => {
        this.employeeService.getAllEmployee()
        .then((employees: Employee[])=>{
            res.json({employees:employees});
        })
        .catch(()=>{
            res.send('error');
        });
    }
}