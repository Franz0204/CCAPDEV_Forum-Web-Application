import { Router } from 'express';
import { getDb } from '../db/conn.js';
import Post from '../models/Post.js';
import { ObjectId } from 'mongodb';

const searchRouter = Router();
/*const db = getDb();
const posts = db.collection('posts');*/

searchRouter.get('/search', async (req,res) => {
    const postsArr = await Post.find().sort({_id:-1}).lean().exec();
    res.render("search_page", {
        title: "Search",
        posts: postsArr
    });
});

searchRouter.get('/search/:searchParam', async (req,res) => {
    const p = req.params.searchParam;
    const postsArr = await Post.find({body:{$regex:p, $options:"i"}}).sort({_id:-1}).lean().exec();
    res.render("search_page", {
        title: "Search",
        posts: postsArr
    });
});


searchRouter.get('/tagged/:tag', async (req,res) => {
    const postsArr = await Post.find({tags:req.params.tag}).sort({_id:-1}).lean().exec();
    res.render("search_page", {
        title: "Search",
        posts: postsArr
    });
})

export default searchRouter;