import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';

const searchRouter = Router();
const db = getDb();
const posts = db.collection('posts');

searchRouter.get('/search', async (req,res) => {
    const postsArr = await posts.find({}).toArray();
    res.render("search_page", {
        title: "Search",
        posts: postsArr
    });
});

searchRouter.get('/tagged/:tag', async (req,res) => {
    const postsArr = await posts.find({tags:req.params.tag}).toArray();
    res.render("search_page", {
        title: "Search",
        posts: postsArr
    });
})

export default searchRouter;