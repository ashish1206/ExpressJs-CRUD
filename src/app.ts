import { PORT } from './config/constants';
import { EmployeeController } from './routes/EmployeeController';
import express from 'express';
import * as bodyParser from 'body-parser'

//initialize variables
const app = express();
const employeeController = new EmployeeController();

//middlewares
app.use(bodyParser.json());

//routes
app.use('/user', employeeController.router);

app.listen(PORT, ()=>console.log('server started'));