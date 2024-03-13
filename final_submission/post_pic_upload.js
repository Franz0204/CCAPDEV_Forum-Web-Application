import multer from 'multer';

const post_storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './uploads/posts');
    },
    filename: (req,file,cb) => {
        cb(null, req.body.postid);
    }
})

const postpicupload = multer({storage: post_storage});
export default postpicupload;