import { Router } from "express";
//import profileRouter from './profiles.js';
import postRouter from './posts.js';
//import loginRouter from './login.js';

const router = Router();

router.use(postRouter);


router.get('/', function(req,res) {
    res.redirect('/home');
});

export default router;