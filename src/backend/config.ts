import dotenv from "dotenv";
import * as Path   from 'path';

dotenv.config();

const config = {
    MongoHost: process.env.MONGODB_HOST,
    MongoPort: +process.env.MONGODB_PORT,
    DatabaseName: process.env.MONGODB_DATABASE,
    JwtSecret: process.env.JWT_SECRET
};

export const Frontend = {
    DistDir:       pathFromRoot('dist'),
    AssetsDir:     pathFromRoot('assets'),
    IndexHtmlPath: pathFromRoot('dist/index.html')
};

export { config };

function pathFromRoot(relativePath: string) {
    return Path.normalize(Path.join(__dirname, '../../', relativePath));
}