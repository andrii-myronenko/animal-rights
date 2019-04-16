import { gql } from "apollo-server-koa"

export const typeDefs = gql`
    extend type Query {
        hello: String!
    }

    type Mutation{
        register(login: String!, password: String!): String
    }
`;