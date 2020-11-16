import { employeeQueries } from './EmployeeDaoQueries';
import { Pool } from 'pg';
import { DbConnection } from '../dbconnection';
import { DaoError } from '../errors/DaoError';
import Employee, { IEmployee } from '../model/EmployeeDto';

export class EmployeeDao {
    private pool: Pool;
    constructor(){
        this.pool = new DbConnection().dbConnection();
    }
    
    public getAllEmployee = async (): Promise<Employee[]> => {
        try{
            const result = await this.pool.query(employeeQueries.getAllEmployee);
            const employees = await this.populateEmployeeDetails(result);
            return employees;
        }
        catch(err){
            console.log(err);
            throw new DaoError('Error in fetching employees details');
        }
    }

    private populateEmployeeDetails = async (result: any): Promise<Employee[]> => {
        let employees: Employee[] = [];
        result.rows.forEach( (row: any) => {
            let emp: IEmployee = {
                empId: row.emp_id,
                empName: row.emp_name,
                email: row.email,
                password: '',
                managerId: row.manager_id, 
                phoneNumber: row.phone_number
            };
            let employee: Employee = new Employee(emp);
            employees.push(employee);
        });
        return employees;
    }

    public insertEmployee = async (employee: Employee):Promise<void> => {
        try{
            let params: any[] = [];
            params.push(employee.empName);
            params.push(employee.password);
            params.push(employee.email);
            params.push(employee.phoneNumber);
            params.push(employee.managerId);
            console.log(params, employeeQueries.insertEmployee);
            await this.pool.query(employeeQueries.insertEmployee, params);
        }
        catch(err){
            throw new DaoError('Error in creating employee');
        }
    }
}