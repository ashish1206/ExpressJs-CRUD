import { Pool } from 'pg';
import { DbConnection } from './../dbconnection';
import { User } from '../model/UserDto';

export class UserDao {
    private pool: Pool;
    constructor(){
        this.pool = new DbConnection().dbConnection();
    }
    
    public getUser = async (): Promise<User> => {
        const query: string = 'select * from public.user where username = $1';

        try{
            const result: any = await this.pool.query(query, ['user1']);
            console.log('result here', result);
            const row: any = result.rows[0];
            let user: User = new User(row.username, row.email, row.password, row.phone_number);
            console.log("user in dao", user);
            return user;
        }
        catch(err){
            console.log(err);
            throw new Error('error in fetching user');
        }
    }
}