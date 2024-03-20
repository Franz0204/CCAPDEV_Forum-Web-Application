import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

const loginRouter = Router();
const db = getDb();
const credentials = db.collection('credentials');

loginRouter.get('/login', async(req,res) => {
    res.render('login');
})

loginRouter.post('/go-login', async (req, res) => {
    try {
        const { handle, password } = req.body;

        // Retrieve user from database based on the provided handle
        const user = await credentials.findOne({ handle });

        // Check if user exists and the provided password matches
        if (user) {
            // Authentication successful
            bcrypt.compare(password,user.password,function(err,result) {
                if(result) {
                    res.sendStatus(200);
                    console.log('ok');
                }
                else {
                    res.sendStatus(401);
                }
            });
        } else {
            // Authentication failed
            res.sendStatus(401);
        
        }
    } catch (error) {
        // Error occurred while processing the request
        console.error('Error:', error);
       return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default loginRouter;
