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
        bcrypt.hash(req.body.password, r).then(async function(hash) {
            const result = await Credential.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                handle:req.body.handle
            });
            if(result) {
                const result2 = await Profile.create({
                    username: req.body.handle,
                    name: req.body.username,
                    bio: "Default bio"
                })
                if(result2) {
                    res.redirect('/login');
                }
            }
        });
    }catch(err) {
        console.error(err);
    }
    
});

registerRouter.get('/login', async (req, res) => {

    res.render("login")
})
export default registerRouter;