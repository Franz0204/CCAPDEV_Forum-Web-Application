import { Router } from "express";
import { getDb } from "../db/conn.js";
//import profileRouter from './profiles.js';
//import postRouter from './posts.js';
//import loginRouter from './login.js';

const router = Router();
const db = getDb();
const posts = db.collection('posts');



router.get('/', function(req,res) {
    res.redirect('/home.html');
});

router.get('/home.html', function(req,res) {
    res.sendFile("/home.html");
});

router.post('/make-post', async (req,res) => {
    console.log(req.body);
    try {
        const result = await posts.insertOne({
            username: req.body.username,
            name: req.body.name,
            date: req.body.date,
            title: req.body.title,
            body: req.body.body
        })
        if(result.acknowledged) {
            res.sendStatus(200);
        }
    }catch(err) {
        console.error(err);
    }
});

export default router;