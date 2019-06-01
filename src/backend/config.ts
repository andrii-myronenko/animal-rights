import dotenv from "dotenv";
import * as Path   from 'path';

dotenv.config();

const config = {
    MongoUri: process.env.MONGODB_URI,
    JwtSecret: process.env.JWT_SECRET,
    ServerPort: process.env.PORT
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