import multer from 'multer';

const post_storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, '/public/post_images');
    },
    filename: (req,file,cb) => {
        cb(null, file.filename);
    }
})

const postpicupload = multer({storage: post_storage});
export default postpicupload;