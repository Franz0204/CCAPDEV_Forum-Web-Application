import "dotenv/config";
//const result = dotenv.config({path: './final_submission/.env'});
console.log(process.env.MONGODB_URI);
import { dirname } from "path";
import { fileURLToPath } from 'url';
// Web-app related packages
import express from 'express';
import exphbs from 'express-handlebars';

import { connectToMongo } from "./src/db/conn.js";
import router from "./src/routers/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(router);
app.engine('hbs',exphbs.engine({extname: 'hbs'}));
app.set("view engine","hbs");
app.set("views","/views");

console.log("URI:" + process.env.MONGODB_URI);
    try {
        await connectToMongo();
        app.listen(process.env.SERVER_PORT, () => {
        console.log('Listening');
        })
    }catch(err) {
        console.error(err);
    }
