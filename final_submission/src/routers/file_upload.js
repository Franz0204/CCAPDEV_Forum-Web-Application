import pfpupload from "../upload/pfpupload.js";
import postpicupload from "../upload/post_pic_upload.js";
import testupload from "../upload/test.js";

import { Router } from 'express';

const uploadRouter = Router();


uploadRouter.post('/upload-post-image', testupload.any(), function (req,res) {
        const formData = req.body;
        console.log(formData);
        console.log(req.body.filename);
        res.sendStatus(200);
    });
    
uploadRouter.post('/upload-pfp', pfpupload.single('file'), (req,res) => {
        res.send(200);
    });

export default uploadRouter;