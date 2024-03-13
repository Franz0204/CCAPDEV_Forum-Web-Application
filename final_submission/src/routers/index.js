import { Router } from "express";
import registerRouter from './register.js';
import profileRouter from './profiles.js';
import postRouter from './posts.js';
//import loginRouter from './login.js';

const router = Router();

router.use(registerRouter);
router.use(postRouter);
router.use(profileRouter);

router.get('/', function(req,res) {
    res.redirect('/home');
});

export default router;