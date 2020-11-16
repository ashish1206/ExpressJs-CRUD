export const employeeQueries: any = {
    getAllEmployee : 'select * from public.employee',
    insertEmployee: `insert into public.employee(emp_name, password, email, phone_number, manager_id)
                    values($1, $2, $3, $4, $5)`
}