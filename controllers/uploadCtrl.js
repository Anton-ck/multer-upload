import path from 'path';

import Song from '../models/songModel.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import getId3Tags from '../helpers/id3Tags.js';
import trackPictureService from '../services/tracksService/trackPictureService.js';
import createSong from '../services/tracksService/trackCreateService.js';

const getAllMusic = async (req, res) => {
  const allMusic = await Song.find({});

  res.json({ allMusic });
};

const uploadMusic = async (req, res) => {
  if (!req.files) {
    throw HttpError(404, 'File not found for upload');
  }
  const allSongs = req.files;

  const songs = allSongs.map(async (song) => {
    const { common, format } = await getId3Tags(song.path);

    const { artist, title, album, picture } = common;
    const { duration } = format;

    const pictureData = picture?.[0];

    const trackPictureURL = await trackPictureService(pictureData, {
      artist,
      album,
    });

    return await createSong(
      artist,
      title,
      duration,
      song.path,
      trackPictureURL,
    );
  });
  const result = await Promise.all(songs);

  res.json({ result });
};

export default {
  getAllMusic: ctrlWrapper(getAllMusic),
  uploadMusic: ctrlWrapper(uploadMusic),
};
