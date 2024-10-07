const multer = require('multer')

// Set storage engine
const storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null, '../uploads/');
    },
    filename: function(req,file,cb) {
        cb(null, Date.now()+'-'+file.originalname);
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { filesize: 1000000}, // 1MB limit
    fileFilter: function(req, file,cb) {
        checkFileType(file, cb);
    }
}).single('profilePicture');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb('Error: Images Only!')
    }
}

module.exports = upload;