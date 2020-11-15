import { dbConfig } from './config/constants';
import { Pool } from 'pg';

export class DbConnection {
    private pool: Pool;

    constructor(){
        this.pool = new Pool(dbConfig);
    }

    public dbConnection(): Pool{
        return this.pool;
    }
}