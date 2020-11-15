import { PORT } from './config/constants';
import { UserController } from './routes/user';
import express from 'express';

const app = express();

const userController = new UserController();

app.use('/user', userController.router);

app.listen(PORT, ()=>console.log('server started'));