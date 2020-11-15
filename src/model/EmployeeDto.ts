export class Employee {
    public emp_id: number;
    public emp_name: string;
    public email: string;
    public phoneNumber: string;
    public manager_id: string;

    constructor(emp_id: number, emp_name: string, email: string, phoneNumber: string, manager_id: string){
        this.emp_id = emp_id;
        this.emp_name = emp_name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.manager_id = manager_id;
    }
}