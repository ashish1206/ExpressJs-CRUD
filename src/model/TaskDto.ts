export interface ITask {
    taskId: number | undefined,
    description: string | undefined,
    createDate: string | undefined,
    updateDate: string | undefined,
    status: string | undefined,
    details: string | undefined,
    empId: number | undefined
}

class Task implements ITask {
    taskId: number | undefined;
    description: string | undefined;
    createDate: string | undefined;
    updateDate: string | undefined;
    status: string | undefined;
    details: string | undefined;
    empId: number | undefined;

    constructor(task: ITask){
        this.taskId = task.taskId;
        this.description = task.description;
        this.createDate = task.createDate;
        this.updateDate = task.updateDate;
        this.status = task.status;
        this.details = task.details;
        this.empId = task.empId;
    }
}

export default Task;