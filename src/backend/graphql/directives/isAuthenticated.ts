import { SchemaDirectiveVisitor } from "graphql-tools";
import { AuthenticationError } from 'apollo-server';
import { GraphQLObjectType, GraphQLField } from 'graphql';
import { User } from "@models/user";

type GraphQLObjectWithCheck = (GraphQLObjectType & { _requiredAuthRole: string, _authFieldsWrapped: boolean});
type GraphQLFieldWithCheck = (GraphQLField<any, any> & { _requiredAuthRole: string});
type GraphQLDetails = { objectType: GraphQLObjectWithCheck };
type GraphQlFieldWithCheckMap<TSource, TContext, TArgs = { [key: string]: any }> = {
    [key: string]: GraphQLField<TSource, TContext, TArgs>  & { _requiredAuthRole: string};
};

export class AuthDirective extends SchemaDirectiveVisitor {
    visitObject(type: GraphQLObjectWithCheck) {
        this.ensureFieldsWrapped(type);
        type._requiredAuthRole = this.args.requires;
    }
    
    visitFieldDefinition( field: GraphQLFieldWithCheck, details: GraphQLDetails ) {
        this.ensureFieldsWrapped(details.objectType);
        field._requiredAuthRole = this.args.requires;
    }
  
    ensureFieldsWrapped(objectType: GraphQLObjectWithCheck) {
        if (objectType._authFieldsWrapped) return;
        objectType._authFieldsWrapped = true;

        const fields  = objectType.getFields() as GraphQlFieldWithCheckMap<any, any, {[key:string] : any }>;

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const { resolve } = field;
            field.resolve = async function (...args) {
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
  
  