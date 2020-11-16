export interface IEmployee {
    empId: number | undefined,
    password: string | undefined,
    empName: string | undefined,
    email: string | undefined,
    phoneNumber: string | undefined,
    managerId: number | undefined
}

class Employee implements IEmployee {
    public empId: number | undefined;
    public password: string | undefined;
    public empName: string | undefined;
    public email: string | undefined;
    public phoneNumber: string | undefined;
    public managerId: number | undefined;
    
    constructor(emp: IEmployee){
        this.empId = emp.empId;
        this.password = emp.password;
        this.empName = emp.empName;
        this.email = emp.email;
        this.phoneNumber = emp.phoneNumber;
        this.managerId = emp.managerId;
    }
    // constructor(empId: number, password: string, empName: string, email: string, phoneNumber: string, managerId: string){
    //     this.empId = empId;
    //     this.password = password;
    //     this.empName = empName;
    //     this.email = email;
    //     this.phoneNumber = phoneNumber;
    //     this.managerId = managerId;
    // }
}
export default Employee;