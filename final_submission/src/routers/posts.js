import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';

const postRouter = Router();
const db = getDb();
const posts = db.collection('posts');
const profiles = db.collection('profiles');


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