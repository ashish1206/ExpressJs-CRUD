import { Employee } from '../model/EmployeeDto';
import { EmployeeDao } from '../dao/EmployeeDao';

export class EmployeeService {
    private employeeDao: EmployeeDao;
    
    constructor(){
        this.employeeDao = new EmployeeDao();
    }

    public getAllEmployee = (): Promise<Employee[]> => {
        return this.employeeDao.getAllEmployee();
    }
}