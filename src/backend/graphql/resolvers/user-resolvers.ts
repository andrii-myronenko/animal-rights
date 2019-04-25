import { IResolvers } from "graphql-tools";
import { credentialsValidator } from "@modules/validators/credentials-validator";
import { User, Roles } from "@models/user";
import { SHA256 } from "crypto-js";
import { UserInputError, ApolloError, AuthenticationError } from 'apollo-server';
import * as jwt from "jsonwebtoken";
import { config } from "@app/config";


interface ICredentials{
    login: string;
    password: string;
}

export const resolvers: IResolvers = {
    Query: {
        me: async (_, __, context) => {
            return User.findById(context.state.user.id);
        }
    },
    Mutation: {
        register: async (_, args: ICredentials) => {
            try{
                const validationError = credentialsValidator.validate(args);
                if(validationError){
                    return new UserInputError("User input error", { [validationError.notValidatedField]: validationError.message });
                }
                if(await User.findByLogin(args.login)){
                    return new ApolloError(`User already exists`, "USER_EXISTS_ERROR");
                }
                const hashedPassword = SHA256(args.password).toString();
                args.password = hashedPassword;
                return await User.create({login: args.login, password: args.password, role: Roles.USER, dateOfRegistration: Date.now() }).save();
            }
            catch(e){
                return new ApolloError(`Internal server error: "${e.message}"`, "INTERNAL_SERVER_ERROR");
            }
        },
        login: async (_, args: ICredentials) => {
            try{
                const validationError = credentialsValidator.validate(args);
                if(validationError){
                    return new UserInputError("User input error", { [validationError.notValidatedField]: validationError.message });
                }
                if(!(await User.findByLogin(args.login))){
                    return new ApolloError(`No such user`, "USER_EXISTS_ERROR");
                }
                const hashedPassword = SHA256(args.password).toString();
                args.password = hashedPassword;
                const user = await User.findByCredentials(args.login, args.password);
                if(!user){
                    return new AuthenticationError("Incorrect password");
                }
                return jwt.sign({ "id": user.id, "role": user.role }, config.JwtSecret);
            }
            catch(e){
                return new ApolloError(`Internal server error: "${e.message}"`, "INTERNAL_SERVER_ERROR");
            }
        }
    }
};