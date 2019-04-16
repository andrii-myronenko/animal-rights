import { IResolvers } from "graphql-tools"
import { credentialsValidator } from "@modules/validators/credentials-validator"
import { User } from "@models/user";
import * as bcrypt from "bcryptjs";

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
            try{
                credentialsValidator.validate(args);
                const hashedPassword = await bcrypt.hash(args.password, 10)
                args.password = hashedPassword;
                await User.create({credentials: args}).save();
                return "Success!"
            }
            catch(e){
                return e.message;
            }
        }
    }
}