import Song from '../../models/songModel.js';

const createSong = async (
  artist,
  trackName,
  trackDuration,
  trackURL,
  trackPictureURL,
) => {
  let songsInDb;

  try {
    songsInDb = await Song.create({
      artist,
      trackName,
      trackDuration,
      trackURL,
      trackPictureURL,
    });
  } catch (error) {
    console.log(error.message);
  }
  return songsInDb;
};

export default createSong;
