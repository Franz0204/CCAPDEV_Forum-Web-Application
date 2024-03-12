const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');


import router from "./src/routers/index.js";
import { connectToMongo } from "./src/db/conn.js";

async function main() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const app = express();
    app.use(express.static(path.join(__dirname,'public')));
    app.use(express.json());
    app.use(router);
    app.engine('hbs',handlebars.engine({extname: 'hbs'}));
    app.set("view engine","hbs");
    app.set("views","./views");
    console.log("URI:" + process.env.MONGODB_URI);
    try {
        await connectToMongo();
        app.listen(process.env.SERVER_PORT, () => {
        console.log('Listening');
        })
    }catch(err) {
        console.error(err);
    }
 }

 main();