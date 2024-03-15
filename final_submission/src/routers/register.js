import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';

const registerRouter = Router();
const db = getDb();
const credentials = db.collection('credentials');
const profiles = db.collection('profiles');

registerRouter.get('/register', async (req,res) => {
    console.log("test")
    const credential = await credentials.find({}).toArray();
    
    res.render("register", {
        title: "Home",
        posts: credential
    });
});



registerRouter.post('/make-user', async (req,res) => {
    console.log("Test")
    console.log(req.body);
    //Check credentials if fields in body already exist
    /*
    if(credentials exist in db) {
        res.json({success: false})
    }
    else {
        try {
            const result = await credentials.insertOne({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                handle:req.body.handle
            })
            if(result.acknowledged) {
                res.json({success: true})
            }
        }catch(err) {
            console.error(err);
        }
        }
    */
    try {
        const result = await credentials.insertOne({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            handle:req.body.handle
        })
        if(result.acknowledged) {
            const result2 = await profiles.insertOne({
                username: req.body.handle,
                name: req.body.username,
                bio: "Default bio"
            })
            if(result2.acknowledged) {
                let path = '/profiles/' + req.body.handle;
                res.redirect(path);
            }
        }
        
    }catch(err) {
        console.error(err);
    }
    
});

registerRouter.get('/login', async (req, res) => {

    res.render("login")
})
export default registerRouter;