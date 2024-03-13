import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';

const registerRouter = Router();
const db = getDb();
const credentials = db.collection('credentials');


registerRouter.get('/register', async (req,res) => {
var user = req.params.username;
const credentials = await credentials.find ({"username":user}).toArray();
    if (credentials.length > 0) {
        const registerobject = {"username":credentials[0].username,"email":credentials[0].email,"handle":credentials[0].handle,"password":credentials[0].password}
        res.render("register", {
            title: "Credentials",
            username: registerobject.username,
            email: registerobject.email,
            handle: registerobject.handle,
            password: registerobject.password

        });
    
    }

});

export default registerRouter;