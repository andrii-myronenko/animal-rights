export class ValidationError{
    constructor(public message: string, public notValidatedField: string){ }
}