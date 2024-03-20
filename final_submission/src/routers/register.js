import { Router } from 'express';
import { getDb } from '../db/conn.js';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

const r = 15;
const registerRouter = Router();
const db = getDb();
const credentials = db.collection('credentials');
const profiles = db.collection('profiles');

registerRouter.get('/register', async (req,res) => {
    console.log("test")
    
    res.render("register", {
        title: "Home"
    });
});



registerRouter.post('/make-user', async (req,res) => {
    console.log("Test")
    console.log(req.body);
    try {
        bcrypt.hash(req.body.password, r).then(async function(hash) {
            const result = await credentials.insertOne({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                handle:req.body.handle
            })
            if(result.acknowledged) {
                const result2 = await profiles.insertOne({
                    username: req.body.handle,
                    name: req.body.username,
                    bio: "Default bio"
                })
                if(result2.acknowledged) {
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