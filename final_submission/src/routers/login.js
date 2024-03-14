import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';

const loginRouter = Router();
const db = getDb();
const credentials = db.collection('credentials');

loginRouter.post('/go-login', async (req, res) => {
    try {
        const { handle, password } = req.body;

        // Retrieve user from database based on the provided handle
        const user = await credentials.findOne({ handle });

        // Check if user exists and the provided password matches
        if (user && user.password === password) {
            // Authentication successful
            return res.status(200).json({ success: true, message: 'Login successful' });
         
        } else {
            // Authentication failed
        return  res.status(401).json({ success: false, message: 'Invalid credentials' });
        
        }
    } catch (error) {
        // Error occurred while processing the request
        console.error('Error:', error);
       return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default loginRouter;
