const multer = require('multer');

const upload = multer({
    //dest : 'public/images', // it will store the uploaded file into given folder
    limits : {
        fileSize : 1000000 // 1mb
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)/)) // use regular expression to filter file extensions
        {
            return cb(new Error('Invalid file type !'));
        }
        return cb(undefined, true);
    }
});

module.exports = upload