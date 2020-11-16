import { Request } from 'express';
import Employee, { IEmployee } from './../model/EmployeeDto';
import { ServiceError } from './../errors/ServiceError';
import { EmployeeDao } from '../dao/EmployeeDao';

export class EmployeeService {
    private employeeDao: EmployeeDao;
    
    constructor(){
        this.employeeDao = new EmployeeDao();
    }

    public getAllEmployee = (): Promise<Employee[]> => {
        return this.employeeDao.getAllEmployee();
    }

    public insertEmployee = async (req: Request): Promise<boolean> => {
        try{
            let employee: IEmployee = req.body.employee as Employee;
            await this.employeeDao.insertEmployee(employee);
            return true;
        }
        catch(err){
            console.log(err);
            throw new ServiceError('Error while inserting employee');
        }
    }
}