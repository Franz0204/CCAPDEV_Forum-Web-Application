import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';

const registerRouter = Router();
const db = getDb();
const credentials = db.collection('credentials');

registerRouter.get('/register', async (req,res) => {
    const credential = await credentials.find({}).toArray();
    res.render("register", {
        title: "Home",
        posts: credential
    });
});



registerRouter.post('/register', async (req,res) => {
    console.log(req.body);
    try {
        const result = await credentials.insertOne({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            handle:req.body.handle,
            body: req.body.body
        })
        if(result.acknowledged) {
            res.sendStatus(200);
        }
    }catch(err) {
        console.error(err);
    }
});

export default registerRouter;