import pfpupload from "../upload/pfpupload.js";
import postpicupload from "../upload/post_pic_upload.js";
import { Router } from 'express';

const uploadRouter = Router();

uploadRouter.post('/upload-post-image', postpicupload.single('file'), (req,res) => {
        res.send(200);
    });
    
uploadRouter.post('/upload-pfp', pfpupload.single('file'), (req,res) => {
        res.send(200);
    });

export default uploadRouter;