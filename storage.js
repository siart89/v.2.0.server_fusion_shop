import multer from 'multer';
import uniqid from 'uniqid';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uniqid()}${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
