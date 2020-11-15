import { employeeQueries } from './EmployeeDaoQueries';
import { Employee } from './../model/EmployeeDto';
import { Pool } from 'pg';
import { DbConnection } from '../dbconnection';

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
            throw new Error('error in fetching user');
        }
    }

    private populateEmployeeDetails = async (result: any): Promise<Employee[]> => {
        let employees: Employee[] = [];
        result.rows.forEach( (row: any) => {
            let employee: Employee = new Employee(row.emp_id, row.emp_name, row.email, row.phoneNumber, row.manager_id);
            employees.push(employee);
        });
        return employees;
    }
}