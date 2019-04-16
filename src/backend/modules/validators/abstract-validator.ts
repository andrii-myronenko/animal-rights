export abstract class AbstractValidator {
    protected hadnler: AbstractValidator

    public setHandler(handler: AbstractValidator): void {
        this.hadnler = handler;
    }

    public abstract validate(value: any): void
}