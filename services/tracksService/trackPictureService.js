import path from 'path';

import getTrackPicture from './getTrackPicture.js';

const defaultTrackPicture = path.join(
  'pictures',
  'trackPictures',
  '55x36_trackCover_default.jpg',
);

const trackPictureService = async (pictureData, { artist, album }) => {
  let trackPictureURL = defaultTrackPicture;
  if (pictureData !== undefined) {
    trackPictureURL = await getTrackPicture.getPictureFromTags(pictureData);
  } else if ((album || artist) !== undefined) {
    trackPictureURL = await getTrackPicture.getPictureFromAlbum(artist, album);
  }

  return trackPictureURL;
};

export default trackPictureService;
