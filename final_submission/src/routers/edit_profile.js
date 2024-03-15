import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';

const editProfileRouter = Router();
const db = getDb();
const profile = db.collection('profiles');
const credentials = db.collection('profiles');

editProfileRouter.get('/editProfile/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const user = await profile.findOne({ username: username });
        if (user) {
            res.render("edit", {
                title: "Edit Profile",
                name: user.name,
                username: user.username,
                bio: user.bio
            });
        } else {
            res.status(404).send("User not found");
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

        const filter = { username: username };

        const updateProfile = {
            $set: {
               name: name,
               bio: bio
            },
         };
        const result = await profile.updateOne(filter, updateProfile);

        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            res.status(400).json({ message: 'Failed to update profile' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default editProfileRouter;
