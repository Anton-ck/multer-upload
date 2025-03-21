import express from 'express';

import upload from '../../middlewares/upload.js';
import controllers from '../../controllers/uploadCtrl.js';

const router = express.Router();

router.get('/getMusic', controllers.getAllMusic);

router.post(
  '/upload',
  //upload.single("songURL"),
  upload.array('songURL', 5),
  controllers.uploadMusic,
);

export default router;
