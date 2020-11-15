export class User {
    public username: string;
    public email: string;
    public password: string;
    public phoneNumber: string;

    constructor(username: string, email: string, password: string, phoneNumber: string){
        this.username = username;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
}