export const employeeQueries: any = {
    getAllEmployee : 'select * from public.employee',
    insertEmployee: `insert into public.employee(emp_name, password, email, phone_number, manager_id)
                    values($1, $2, $3, $4, $5)`,
    updateManager: `update public.employee set manager_id = $1 where emp_id = $2`,
    getEmployee: `select * from public.employee where emp_id = $1`,
    getEmployeesByManagerID: `select * from public.employee where manager_id = $1`,
    getManagerByEmpId: `select * from public.employee where emp_id = 
                        (select manager_id from public.employee where emp_id = $1)`,
    deleteEmployee: `delete from public.employee where emp_id = $1`,
    createTask: `insert into public.task (description, create_date, update_date, status_id, details, emp_id)
                values ($1, now()::timestamp(0), now()::timestamp(0), (select status_id from public.task_status
                where upper(status_name) = upper($2)), $3, $4)`,
    updateTask: `update public.task set details = $1, update_date = now()::timestamp(0),
                 status_id = (select status_id from public.task_status where upper(status_name) = upper($2)) where task_id= $3`,
    getTaskDetails: `select task_tab.*, status_tab.status_name as status from
                    public.task task_tab join public.task_status status_tab on 
                    task_tab.status_id = status_tab.status_id where task_id = $1`,
    getAllTaskByEmp: `select task_tab.*, status_tab.status_name as status from public.task task_tab
                        join public.task_status status_tab on 
                        task_tab.status_id = status_tab.status_id where emp_id = $1`,
    getAllTaskByManager: `select task_tab.*, status_tab.status_name as status from public.task task_tab
                            join public.task_status status_tab on 
                            task_tab.status_id = status_tab.status_id 
                            where emp_id in (select emp_id from public.employee
                            where manager_id = $1)`
}