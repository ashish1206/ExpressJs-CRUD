import { User } from './../model/UserDto';
import { UserDao } from './../dao/userDao';

export class UserService {
    private userDao: UserDao;
    
    constructor(){
        this.userDao = new UserDao();
    }

    public getUser = (): Promise<User> => {
        return this.userDao.getUser();
    }
}