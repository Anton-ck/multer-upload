import Song from "../models/songModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const uploadMusic = async (req, res) => {
  console.log(req.file.path);

  if (!req.file) {
    throw HttpError(404, "File not found for upload");
  }

  const songURL = req.file.path;

  const newSong = await Song.create({
    ...req.body,
  });

  const payload = {
    id: newSong._id,
  };

  // await Song.updateMany({ songURL });

  await Song.findByIdAndUpdate(newSong._id, { songURL });

  await res.json({
    songURL,
  });
};

export default {
  uploadMusic: ctrlWrapper(uploadMusic),
};
