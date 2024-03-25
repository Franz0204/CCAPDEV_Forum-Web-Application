import { Router } from 'express';
import { ObjectId } from 'mongodb';
import Profile from '../models/Profile.js'
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

const editProfileRouter = Router();

editProfileRouter.get('/editProfile/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const user = await Profile.findOne({ username: username });
        if (user) {
            res.render("edit", {
                title: "Edit Profile",
                name: user.name,
                username: user.username,
                bio: user.bio
            });
        } else {
            res.render('/error');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send("Internal server error");
    }
});

editProfileRouter.put('/update-profile', async (req, res) => {
    const { username, name, bio } = req.body;
    console.log("Request Body:", req.body);
    try {
        const filter = {username: username};
        const profile = await Profile.findOne(filter).exec();
        if(profile) {
            profile.name = name,
            profile.bio = bio
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

export default editProfileRouter;
