import multer from "multer";
import path from "path";

import HttpError from "../helpers/HttpError.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp3") {
      cb(
        HttpError(400, "Wrong extension type! Extensions should be *.mp3"),
        false
      );
    } else {
      cb(null, true);
    }
  },
});

export default upload;
