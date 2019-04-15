import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "@models/user";
import Koa from 'koa';
import { userRouter } from "@routes/user"

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
        const app = new Koa();
        app.use(userRouter.routes());
        app.listen(3000, () => console.log(`🚀 Server ready at http://localhost:3000`));
    }
    catch(e){
        console.log(e.message);
    }
} 

bootstrap();