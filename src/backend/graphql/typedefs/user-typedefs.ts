import { gql } from "apollo-server-koa"

export const typeDefs = gql`
    type User {
        id: ID!
        firstName: String
        lastName: String
        email: String!
        photoUrl: String
        dateOfRegistration: Date!
    }

    extend type Query {
        me: User
    }

    type Mutation {
        register (email: String!, password: String!): String
        login (email: String!, password: String!): User
    }
`;
 