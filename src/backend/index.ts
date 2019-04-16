import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "@models/user";
import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { userRouter } from "@routes/user"
import { schema } from "@graphql/schema"
  

const bootstrap = async () => {
    try{
        await createConnection({
            type: "mongodb",
            host: "localhost",
            port: 27017,
            database: "zooKeeperDB",
            entities: [User]
        });
        console.log("MongoDB is running");

        const server = new ApolloServer({schema: schema});
        const app = new Koa();
        server.applyMiddleware({ app });
        app.use(userRouter.routes());
        app.listen(3000, () => console.log(`🚀 Server ready at http://localhost:3000`));
    }
    catch(e){
        console.log(e.message);
    }
} 

bootstrap();