import { IResolvers } from "graphql-tools"
import { credentialsValidator } from "@modules/validators/credentials-validator"
import { User } from "@models/user";
import * as bcrypt from "bcryptjs";
import { UserInputError } from 'apollo-server';

interface ICredentials{
    login: string;
    password: string;
}

export const resolvers: IResolvers = {
    
    Query: {
        hello: () => "hi"
    },
    Mutation: {
        register: async (_, args: ICredentials) => {
            const validationError = credentialsValidator.validate(args);
            if(validationError){
                throw new UserInputError("User input error", { [validationError.notValidatedField]: validationError.message })
            }
            const hashedPassword = await bcrypt.hash(args.password, 10)
            args.password = hashedPassword;
            return await User.create({credentials: args}).save();
        }
    }
}