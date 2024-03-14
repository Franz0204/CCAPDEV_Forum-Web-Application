import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';
import express from 'express';

const postRouter = Router();
const db = getDb();
const posts = db.collection('posts');
const profiles = db.collection('profiles');
const comments = db.collection('comments');

postRouter.use(express.json());

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
            postid: req.body.postid,
            username: req.body.username,
            name: req.body.name,
            date: req.body.date,
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags,
            hasImage: req.body.hasImage
        })
        if(result.acknowledged) {
            res.sendStatus(200);
        }
    }catch(err) {
        console.error(err);
    }
});

postRouter.get('/posts/:postID', async(req,res) => {
    var postid = req.params.postID;
    const postArr = await posts.find({"postid":postid}).toArray();
    if(postArr.length > 0) {
        const commentArr = await comments.find({"original_postid":postid}).toArray();
        res.render("post_page", {
            post: postArr[0],
            comments: commentArr
        })
    }
    else {
        res.redirect('/error');
    }
});

postRouter.post('/make-comment', async(req,res) => {
    try {
        const result = await comments.insertOne({
            original_postid: req.body.original_postid,
            commentid: req.body.commentid,
            username: req.body.username,
            name: req.body.name,
            date: req.body.date,
            text: req.body.text
        });
        if(result.acknowledged) {
            res.sendStatus(200);
        }
    }catch(err) {
        res.sendStatus(500);
    }
});

const profile = db.collection('profiles');

postRouter.get('/profiles/:username', async (req,res) => {
    var user = req.params.username;
    const profilesArr = await profiles.find({"username":user}).toArray();
    const postsArr = await posts.find({"username":user}).toArray();
    if (profilesArr.length > 0){
        const profileobject = {"username":user,"name":profilesArr[0].name,"bio":profilesArr[0].bio}
        res.render("profile", {
            title: "Profile",
            name: profileobject.name,
            username: profileobject.username,
            bio: profileobject.bio,
            posts: postsArr
        });
    }
    else {
        res.redirect("/error");
    }
});


export default postRouter;