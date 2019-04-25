import { AbstractValidator } from "./abstract-validator";
import { ValidationError } from "@modules/errors/validation-error";

class LoginValidator extends AbstractValidator {
    public validate(value: any){
        const login = value.login as string;
        if(!login.match(/[A-Za-z0-9]{3,24}/)){
            return new ValidationError(`Login has to contain only latin letters and numbers and contain from 3 to 24 symbols`, "login");
        }
        if(this.hadnler){
            return this.hadnler.validate(value);
        }
        return null;
    }
}

class PasswordValidator extends AbstractValidator {
    public validate(value: any){
        const password = value.password as string;
        if(!password.match(/[A-Za-z0-9]{3,24}/)){
            return new ValidationError(`Password has to contain only latin letters and numbers and contain from 3 to 24 symbols`, "password");
        }
        if(this.hadnler){
            return this.hadnler.validate(value);
        }
        return null;
    }
}

class CredentialsValidator extends AbstractValidator {
    private static readonly instance = new CredentialsValidator();

    public static getInstance(){
        return CredentialsValidator.instance;
    }

    public validate(value: any){
        const { login, password } = value;
        if(!(login)){
            return new ValidationError("No required field in validated object", "login");
        }
        if(!(password)){
            return new ValidationError("No required field in validated object", "password");
        }
        return this.hadnler.validate(value);
        
    }

    constructor(){
        super();
        const loginValidator = new LoginValidator();
        loginValidator.setHandler(new PasswordValidator);
        this.setHandler(loginValidator);
        return this;
    }
}

const validator = CredentialsValidator.getInstance();


export { validator as credentialsValidator };