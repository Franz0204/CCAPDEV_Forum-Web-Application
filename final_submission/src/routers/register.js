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

export default registerRouter;