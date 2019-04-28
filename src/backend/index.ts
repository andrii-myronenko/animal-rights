import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "@models/user";
import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { userRouter } from "@routes/routes";
import { schema } from "@graphql/schema";
import bodyParser from "koa-bodyparser";
import { config, Frontend } from "./config";
import jwt from "koa-jwt";
import serve from 'koa-static';

const bootstrap = async () => {
    try{
        await createConnection({
            type: "mongodb",
            host: "localhost",
            port: config.MongoPort,
            database: config.DatabaseName,
            entities: [User]
        });

        console.log("MongoDB is running");
        const server = new ApolloServer({ schema, context: ({ ctx }) => ctx });
        const app = new Koa();

        app.use(bodyParser());

        app.use(serve(Frontend.DistDir));
        app.use(serve(Frontend.AssetsDir));

        app.use(jwt({ secret: config.JwtSecret, passthrough: true }));
        app.use(userRouter.routes());
        
        server.applyMiddleware({ app });
        app.listen(3000, () => console.log(`🚀 Server ready at http://localhost:3000`));
        
    }
    catch(e){
        console.log(e.message);
    }
};

bootstrap();