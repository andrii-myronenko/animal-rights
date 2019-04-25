import { SchemaDirectiveVisitor } from "graphql-tools";
import { AuthenticationError } from 'apollo-server';
import { User } from "@models/user";

export class AuthDirective extends SchemaDirectiveVisitor {
    visitObject(type: any) {
        this.ensureFieldsWrapped(type);
        type._requiredAuthRole = this.args.requires;
    }
    
    visitFieldDefinition( field: any, details: any ) {
        this.ensureFieldsWrapped(details.objectType);
        field._requiredAuthRole = this.args.requires;
    }
  
    ensureFieldsWrapped(objectType: any) {
        if (objectType._authFieldsWrapped) return;
        objectType._authFieldsWrapped = true;

        const fields = objectType.getFields();

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const { resolve } = field;
            field.resolve = async function (...args: any[]) {
                const requiredRole = field._requiredAuthRole || objectType._requiredAuthRole;
                if (!requiredRole) {
                    return resolve.apply(this, args);
                }
                const context = args[2];
                const user = context.state.user;
                if (!user) {
                    throw new AuthenticationError("User not authenticated");
                }
                if(!User.checkRoleAccess(requiredRole, user.role)){
                    throw new AuthenticationError("Access denied"); 
                }
                return resolve.apply(this, args);
            };
        });
    }
}
  
  