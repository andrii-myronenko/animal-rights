import dotenv from "dotenv";

dotenv.config();

const config = {
    MongoPort: +process.env.MONGODB_PORT,
    DatabaseName: process.env.MONGODB_DATABASE,
    JwtSecret: process.env.JWT_SECRET
};

export { config };