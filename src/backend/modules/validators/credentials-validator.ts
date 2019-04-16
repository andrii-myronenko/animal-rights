import { AbstractValidator } from "./abstract-validator"

class LoginValidator extends AbstractValidator {
    public validate(value: any){
        const login = value.login as string;
        if(login.match(/[^A-Za-z0-9]{3,24}/)){
            this.hadnler.validate(value)
        }
        else{
            throw new Error(`Login validation error`);
        }
    }
}

class PasswordValidator extends AbstractValidator {
    public validate(value: any){
        const login = value.password as string;
        if(login.match(/[^A-Za-z0-9]{3,24}/)){
            this.hadnler.validate(value)
        }
        else{
            throw new Error(`Password validation error`);
        }
    }
}

class CredentialsValidator extends AbstractValidator {
    private static instance = new CredentialsValidator();

    public static getInstance(){
        return CredentialsValidator.instance;
    }

    public validate(value: any){
        if("login" in value && "password" in value){
            this.hadnler.validate(value);
        }
    }

    constructor(){
        super();
        const loginValidator = new LoginValidator();
        loginValidator.setHandler(new PasswordValidator);
        this.setHandler(loginValidator);
        return this;
    }
}

const validator = CredentialsValidator.getInstance()


export { validator as credentialsValidator }