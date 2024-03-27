import { Router } from 'express';
import { getDb } from '../db/conn.js';
import Post from '../models/Post.js';
import { ObjectId } from 'mongodb';

const searchRouter = Router();
/*const db = getDb();
const posts = db.collection('posts');*/

searchRouter.get('/search', async (req,res) => {
    const postsArr = await Post.find().sort({_id:-1}).lean().exec();
    let renderObj = {
        title: "Search",
        posts: postsArr
    }
    if(req.session.username) {
        renderObj.user = {
            username: req.session.username,
            name: req.session.name
        };
        renderObj.posts.forEach((element)=> {
            if(element.username===req.session.username) {
                element.me = true
            }
        });
    }
    res.render("search_page", renderObj);
});

searchRouter.get('/search/:searchParam', async (req,res) => {
    const p = req.params.searchParam;
    const postsArr = await Post.find({body:{$regex:p, $options:"i"}}).sort({_id:-1}).lean().exec();
    let renderObj = {
        title: "Search",
        posts: postsArr
    };
    if(req.session.username) {
        renderObj.user = {
            username: req.session.username,
            name: req.session.name
        };
        renderObj.posts.forEach((element)=> {
            if(element.username===req.session.username) {
                element.me = true
            }
        });
    }
    res.render("search_page", renderObj);
});


searchRouter.get('/tagged/:tag', async (req,res) => {
    const postsArr = await Post.find({tags:req.params.tag}).sort({_id:-1}).lean().exec();
    let renderObj = {
        title: "Search",
        posts: postsArr
    };
    if(req.session.username) {
        renderObj.user = {
            username: req.session.username,
            name: req.session.name
        };
        renderObj.posts.forEach((element)=> {
            if(element.username===req.session.username) {
                element.me = true
            }
        });
    }
    res.render("search_page", renderObj);
})

export default searchRouter;