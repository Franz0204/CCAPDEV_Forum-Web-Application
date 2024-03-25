import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import Credential from '../models/Credential.js';

const loginRouter = Router();
/*const db = getDb();
const credentials = db.collection('credentials');
*/
loginRouter.get('/login', async(req,res) => {
    res.render('login');
})

loginRouter.post('/go-login', async (req, res) => {
    try {
        const { handle, password } = req.body;

        // Retrieve user from database based on the provided handle
        const user = await Credential.findOne({ handle }).lean().exec();

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
       res.sendStatus(500);
    }
});

export default loginRouter;
