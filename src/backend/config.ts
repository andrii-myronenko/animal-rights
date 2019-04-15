import path from "path"
import dotenv from "dotenv"

dotenv.config({path: path.resolve(process.cwd(), "../", ".env")});

const config = {
    DatabaseUrl: process.env.MONGODB_URI,
    ServerPort: 5000
};

export { config }