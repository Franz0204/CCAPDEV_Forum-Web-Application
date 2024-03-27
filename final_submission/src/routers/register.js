import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

import Profile from '../models/Profile.js';
import Credential from '../models/Credential.js';

const r = 15;
const registerRouter = Router();

registerRouter.get('/register', async (req,res) => {
    console.log("test")
    
    res.render("register", {
        title: "Register"
    });
});


registerRouter.post('/make-user', async (req,res) => {
    console.log("Test")
    console.log(req.body);
    try {
        const check = await Credential.findOne({username: req.body.username}).lean().exec();
        if(!check) {
            bcrypt.hash(req.body.password, r).then(async function(hash) {
                const result = await Credential.create({
                    email: req.body.email,
                    password: hash,
                    username:req.body.username
                });
                if(result) {
                    const result2 = await Profile.create({
                        username: req.body.username,
                        name: req.body.name,
                        bio: "Default bio"
                    })
                    if(result2) {
                        res.redirect('/login');
                    }
                }
            });
        }
    }catch(err) {
        console.error(err);
    }
    
});

registerRouter.get('/login', async (req, res) => {

    res.render("login")
})
export default registerRouter;