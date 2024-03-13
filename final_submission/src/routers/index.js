import { Router } from "express";
import registerRouter from './register.js';
import postRouter from './posts.js';
import searchRouter from './search.js';
import editProfileRouter from './edit_profile.js';
import uploadRouter from "./file_upload.js";
//import loginRouter from './login.js';

const router = Router();

router.use(registerRouter);
router.use(postRouter);
router.use(searchRouter);
router.use(editProfileRouter);

router.get('/', function(req,res) {
    res.redirect('/home');
});

router.get('/error', function(req,res) {
    res.render('error');
})

export default router;