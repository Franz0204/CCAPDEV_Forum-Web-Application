import multer from 'multer';

const post_storage = multer.diskStorage({
    destination: "../../public/post_images",
    filename: function (req,file,cb) {
        cb(null, req.file.filename);
    }
})

const postpicupload = multer({storage: post_storage});
export default postpicupload;