import { DaoError } from './../errors/DaoError';
import { employeeQueries } from './EmployeeDaoQueries';
import { Pool } from 'pg';
import { DbConnection } from '../dbconnection';
import Employee, { IEmployee } from '../model/EmployeeDto';

export class EmployeeDao {
    private pool: Pool;
    constructor(){
        this.pool = new DbConnection().dbConnection();
    }
    
    public getAllEmployee = async (): Promise<Employee[]> => {
        try{
            const result = await this.pool.query(employeeQueries.getAllEmployee);
            const employees = await this.populateEmployeesDetails(result);
            return employees;
        }
        catch(err){
            throw new DaoError('Error in fetching employees details');
        }
    }

    private populateEmployeesDetails = async (result: any): Promise<Employee[]> => {
        try {
            let employees: Employee[] = [];
            result.rows.forEach( (row: any) => {
                let emp: IEmployee = {
                    empId: row.emp_id,
                    empName: row.emp_name,
                    email: row.email,
                    password: undefined,
                    managerId: row.manager_id, 
                    phoneNumber: row.phone_number
                };
                let employee: Employee = new Employee(emp);
                employees.push(employee);
            });
            return employees;
        }
        catch(err){
            throw new DaoError('Error in populating employee details');
        }
    }

    public insertEmployee = async (employee: Employee):Promise<void> => {
        try{
            let params: any[] = [];
            params.push(employee.empName);
            params.push(employee.password);
            params.push(employee.email);
            params.push(employee.phoneNumber);
            params.push(employee.managerId);
            const result = await this.pool.query(employeeQueries.insertEmployee, params);
        }
        catch(err){
            throw new DaoError('Error in creating employee');
        }
    }

    public updateManager = async (empId: number, managerId: number): Promise<number> => {
        try{
            const params: any[] = [managerId, empId];
            const result = await this.pool.query(employeeQueries.updateManager, params);
            return result.rowCount;
        }
        catch(err){
            throw new DaoError('Error in updating manager');
        }
    }

    public getEmployee = async (empId: number): Promise<Employee> => {
        try{
            const params: any[] = [empId];
            const result: any = await this.pool.query(employeeQueries.getEmployee, params);
            const emp: Employee = this.populateEmployeeDetails(result);
            return emp;
        }
        catch(err){
            throw new DaoError('Error in getting employee details');
        }
    }

    private populateEmployeeDetails = (result: any): Employee => {
        try{
            let emp: IEmployee = {
                empId: result.rows[0].emp_id,
                empName: result.rows[0].emp_name,
                password: undefined,
                email: result.rows[0].email,
                managerId: result.rows[0].manaher_id,
                phoneNumber: result.rows[0].phone_number
            }
            return new Employee(emp);
        }
        catch(err){
            throw new DaoError('Error in populating employee details');
        }
    }

    public getEmployeesByManagerId = async (managerId: number): Promise<Employee[]> => {
        try{
            const params: any[] = [managerId];
            const result = await this.pool.query(employeeQueries.getEmployeesByManagerID, params);
            const employeeList: Employee[] = await this.populateEmployeesDetails(result);
            return employeeList;
        }
        catch(err){
            throw new DaoError('Error in getting employees');
        }
    }

    public getManagerByEmpId = async (empId: number):Promise<Employee> => {
        try{
            const params: any[] = [empId];
            const result = await this.pool.query(employeeQueries.getManagerByEmpId, params);
            const manager: Employee = this.populateEmployeeDetails(result);
            return manager;
        }
        catch(err){
            throw new DaoError('Error while fetching manager details');
        }
    }

    public deleteEmployee = async (empId: number):Promise<number> => {
        try{
            const params: any[] = [empId];
            const result = await this.pool.query(employeeQueries.deleteEmployee, params);
            return result.rowCount;
        }
        catch(err){
            throw new DaoError('Error while deleting employee');
        }
    }
}