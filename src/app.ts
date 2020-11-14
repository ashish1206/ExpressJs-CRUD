import { UserController } from './routes/user';
import express from 'express';

const app = express();

app.use('/user', new UserController().router);

app.listen(3000, ()=>console.log('server started'));