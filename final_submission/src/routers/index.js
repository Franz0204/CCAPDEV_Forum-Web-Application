import { Router } from "express";
import registerRouter from './register.js';
import profileRouter from './profiles.js';
import postRouter from './posts.js';
import searchRouter from './search.js';
import editProfileRouter from './edit_profile.js';
import loginRouter from './login.js';


const router = Router();

router.use(registerRouter);
router.use(postRouter);
router.use(profileRouter);
router.use(searchRouter);
router.use(editProfileRouter);
router.use(loginRouter);

router.get('/', function(_req,res) {
    res.redirect('/home');
});

export default router;