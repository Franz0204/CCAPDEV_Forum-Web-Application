import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';

const postRouter = Router();
const db = getDb();
const posts = db.collection('posts');

postRouter.get('/home', async (req,res) => {
    const postsArr = await posts.find({}).toArray();
    res.render("home", {
        title: "Home",
        posts: postsArr
    });
});

postRouter.post('/make-post', async (req,res) => {
    console.log(req.body);
    try {
        const result = await posts.insertOne({
            username: req.body.username,
            name: req.body.name,
            date: req.body.date,
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags
        })
        if(result.acknowledged) {
            res.sendStatus(200);
        }
    }catch(err) {
        console.error(err);
    }
});

postRouter.get('/posts/:postID', async(req,res) => {
    
});

export default postRouter;