import multer from 'multer';

const pfpstorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './uploads/pfp');
    },
    filename: (req,file,cb) => {
        cb(null, req.body.username);
    }
})

const pfpupload = multer({storage: pfpstorage});
export default pfpupload;