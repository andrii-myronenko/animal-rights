import { IResolvers } from "graphql-tools";
import { Animal } from "@models/animal";
import { ApolloError } from 'apollo-server';
import { AnimalType, Order } from "@common/interfaces";

export interface GetAnimalsArguments{
    offset: number;
    number: number;
    types: AnimalType[];
    order: Order;
    searchQuery: string;
}

export interface CreateAnimalArguments{
    name: string;
    description: string;
    photoUrl: string;
    type: AnimalType;
}

export const resolvers: IResolvers = {
    Query: {
        getAnimals: async (_, args: GetAnimalsArguments) => {
            if(args.number <= 0){
                throw new Error("Number of animals must be a postitive integer");
            }
            if(args.offset < 0){
                throw new Error("Offset field can't be negative");
            }
            const searchQuery = args.searchQuery ? args.searchQuery : "";
            const animalsQuery = await Animal.findByTypesAndSearchQuery(args.offset, args.types, args.number, args.order, searchQuery);
            const result = {
                animals: animalsQuery[0],
                count: animalsQuery[1]
            };
            return result;
        }
    },
    Mutation: {
        createAnimal: async (_, args: CreateAnimalArguments) => {
            try{
                return await Animal.create({name: args.name, 
                    description: args.description, 
                    dateOfCreation: Date.now(),
                    photoUrl: args.photoUrl,
                    type: args.type,
                }).save();
            }
            catch(e){
                return new ApolloError(`Internal server error: "${e.message}"`, "INTERNAL_SERVER_ERROR");
            }
        }
    }
};