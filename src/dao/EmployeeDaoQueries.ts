export const employeeQueries: any = {
    getAllEmployee : 'select * from public.employee',
    insertEmployee: `insert into public.employee(emp_name, password, email, phone_number, manager_id)
                    values($1, $2, $3, $4, $5)`,
    updateManager: `update public.employee set manager_id = $1 where emp_id = $2`,
    getEmployee: `select * from public.employee where emp_id = $1`
}