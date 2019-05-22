import { merge } from 'lodash';
import { gql, makeExecutableSchema } from 'apollo-server-koa';
import { typeDefs as User } from "@graphql/typedefs/user-typedefs";
import { typeDefs as Animal } from "@graphql/typedefs/animal-typedefs";
import { resolvers as userResolvers } from "@graphql/resolvers/user-resolvers";
import { resolvers as animalResolvers } from "@graphql/resolvers/animal-resolver";
import { AuthDirective } from "@graphql/directives/isAuthenticated";

const Query = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

const resolvers = {};

const schema = makeExecutableSchema({
    typeDefs: [ Query, User, Animal ],
    resolvers: merge(resolvers, userResolvers, animalResolvers),
    schemaDirectives: {
        auth: AuthDirective,
    }
});

export { schema };
