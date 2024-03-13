import multer from 'multer';

const pfpstorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, '/public/profile_assets');
    },
    filename: (req,file,cb) => {
        cb(null, file.filename);
    }
})

const pfpupload = multer({storage: pfpstorage});
export default pfpupload;