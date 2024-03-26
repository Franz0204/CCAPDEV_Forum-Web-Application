import { Router } from 'express';
import { ObjectId } from 'mongodb';
import Profile from '../models/Profile.js'
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

const editPostRouter = Router();

editPostRouter.get('/editProfile/:username/:postId', async (req, res) => {
    const postId = req.params.postId;
    const username = req.params.username;
    try {
        const post = await Post.findOne({ postid: postId });
        const user = await Profile.findOne({ username: username });
        if (post && user) {
            res.render("edit_post", {
                title: "Edit Profile",
                postId: post.postid,
                name: user.name,
                username: user.username,
                bio: user.bio
            });
        } else {
            res.redirect('/error');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send("Internal server error");
    }
});

editPostRouter.put('/update-post', async (req, res) => {
    const { username, name, bio } = req.body;
    console.log("Request Body:", req.body);
    try {
        const filter = {username: username};
        const profile = await Profile.findOne(filter).exec();
        if(profile) {
            profile.name = name;
            profile.bio = bio;
            await profile.save();
            res.sendStatus(200);
            await Post.updateMany(filter, {
                name: name
            });
            await Comment.updateMany(filter, {
                name: name
            });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default editPostRouter;
