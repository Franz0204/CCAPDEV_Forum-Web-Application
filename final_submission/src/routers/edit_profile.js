import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';

const editProfileRouter = Router();
const db = getDb();
const profile = db.collection('profiles');

editProfileRouter.get('/editProfile/:username', async (req,res) => {
    var user = req.params.username;
    const profiles = await profile.find({"username":user}).toArray();
    if (profiles.length > 0){
        const profileobject = {"username":user,"name":profiles[0].name,"bio":profiles[0].bio}
        res.render("edit_profile", {
            title: "Edit Profile",
            name: profileobject.name,
            username: profileobject.username,
            bio: profileobject.bio
        });
    }
});

export default editProfileRouter;