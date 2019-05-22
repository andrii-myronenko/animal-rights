import { gql } from "apollo-server-koa";

export const typeDefs = gql`
    enum AnimalType {
        Dog
        Cat
        Hamster
        Other
    }

    enum Order {
        ASC,
        DESC
    }

    type Animal {
        id: ID!
        name: String!
        description: String!
        photoUrl: String!
        dateOfCreation: String!
        type: AnimalType!
    }

    type QueryReturnType {
        animals: [Animal]!
        count: Int!
    }

    extend type Query {
        getAnimals (offset: Int!, number: Int!, types: [AnimalType]!, order: Order!, searchQuery: String): QueryReturnType
    }

    extend type Mutation {
        createAnimal (name: String!, description: String!, photoUrl: String!, type: AnimalType!): Animal
    }
`;
 