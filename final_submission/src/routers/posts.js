import { Router } from 'express';
//import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';
import express from 'express';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import Profile from '../models/Profile.js';

const postRouter = Router();
postRouter.use(express.json());

postRouter.get('/home', async (req,res) => {
    const postsArr = await Post.find().sort({_id: -1}).lean().exec();
    const top = await Post.find().sort({_id: -1}).lean().exec();
    res.render("home", {
        title: "Home",
        posts: postsArr,
        topposts: top
    });
});

postRouter.post('/make-post', async (req,res) => {
    console.log(req.body);
    try {
        await Post.create({
            postid: req.body.postid,
            username: req.body.username,
            name: req.body.name,
            date: req.body.date,
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags,
            hasImage: req.body.hasImage
        })
        res.sendStatus(200);
    }catch(err) {
        console.error(err);
    }
});

postRouter.get('/posts/:postID', async(req,res) => {
    var postid = req.params.postID;
    const top = await Post.find().sort({_id: -1}).lean().exec();
    const post = await Post.findOne({postid: postid}).lean().exec();
    if(post) {
        const comment = await Comment.find({original_postid: postid}).sort({_id:-1}).lean().exec();
        res.render("post_page", {
            post: post,
            comments: comment,
            topposts: top
        })
    }
    else {
        res.redirect('/error');
    }
});


postRouter.post('/make-comment', async(req,res) => {
    try {
        await Comment.create({
            original_postid: req.body.original_postid,
            commentid: req.body.commentid,
            username: req.body.username,
            name: req.body.name,
            date: req.body.date,
            text: req.body.text
        });
        res.sendStatus(200);
    }catch(err) {
        res.sendStatus(500);
    }
});


postRouter.get('/profiles/:username', async (req,res) => {
    var user = req.params.username;
    const profile = await Profile.findOne({username:user}).lean().exec();
    const postsArr = await Post.find({username:user}).sort({_id: -1}).lean().exec();
    if (profile){
        res.render("profile", {
            title: "Profile",
            profile: profile,
            posts: postsArr
        });
    }
    else {
        res.redirect("/error");
    }
});


export default postRouter;