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

    public insertEmployee = async (req: Request): Promise<void> => {
        try{
            let employee: IEmployee = req.body.employee as Employee;
            await this.employeeDao.insertEmployee(employee);
        }
        catch(err){
            console.log(err);
            throw new ServiceError('Error while inserting employee');
        }
    }

    public updateManager = async (empId: number, managerId: number): Promise<void> => {
        try{
            const rowCount = await this.employeeDao.updateManager(empId, managerId);
            if(rowCount == 0){
                throw new ServiceError('Error in updating manager');
            }
        }
        catch(err){
            throw new ServiceError('Error in updating manager');
        }
    }

    public getEmployee = async (empId: number): Promise<Employee> => {
        try {
            const emp = await this.employeeDao.getEmployee(empId);
            return emp;
        }
        catch(err) {
            throw new ServiceError('Error in getting emplyee details');
        }
    }
}