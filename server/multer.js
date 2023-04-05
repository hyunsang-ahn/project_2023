const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads'); // 업로드할 파일의 저장 경로
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // 업로드할 파일의 원래 이름으로 저장
    }
});

const upload = multer({ storage: storage });


export default upload