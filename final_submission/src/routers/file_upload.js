import pfpupload from "../upload/pfpupload.js";
import postpicupload from "../upload/post_pic_upload.js";
import testupload from "../upload/test.js";

import { Router } from 'express';

const uploadRouter = Router();


uploadRouter.post('/upload-post-image', postpicupload.array('file',1), function (req,res) {
        const formData = req.body;
        console.log(formData);
        console.log(req.files);
        console.log(req.body.filename);
        res.sendStatus(200);
    });
    
uploadRouter.post('/upload-pfp', pfpupload.array('file',1), (req,res) => {
        res.sendStatus(200);
    });

export default uploadRouter;