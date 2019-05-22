import { gql } from "apollo-server-koa";

export const typeDefs = gql`
    directive @auth(
        requires: Role = ADMIN,
    ) on OBJECT | FIELD_DEFINITION

    enum Role {
        ADMIN
        USER
    }

    type User {
        id: ID!
        firstName: String
        lastName: String
        login: String!
        photoUrl: String
        dateOfRegistration: String!
        role: Role!
    }

    extend type Query {
        me: User @auth(requires: USER)
    }

    extend type Mutation {
        register (login: String!, password: String!): User
        login (login: String!, password: String!): String!
    }
`;
 