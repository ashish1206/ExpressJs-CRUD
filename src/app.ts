import { TaskController } from './routes/TaskController';
import { PORT } from './config/constants';
import { EmployeeController } from './routes/EmployeeController';
import express from 'express';
import * as bodyParser from 'body-parser'

//initialize variables
const app = express();
const employeeController = new EmployeeController();
const taskController = new TaskController();

//middlewares
app.use(bodyParser.json());

//routes
app.use('/employee', employeeController.router);

app.use('/task', taskController.router);

app.listen(PORT, ()=>console.log('server started'));