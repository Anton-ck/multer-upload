import path from 'path';
import fs from 'fs/promises';
import albumArt from 'album-art';
import resizeCover from '../../helpers/resizeCovers.js';

const getPictureFromTags = async (pictureData) => {
  if (!pictureData) {
    throw new Error('Function getPictureFromTags must have arguments');
  }

  let result;

  try {
    const imageFormat = pictureData.format.split('/')[1];
    const buffer = Buffer.from(pictureData.data);

    const tempPicture = path.resolve('tempDir', `${Date.now()}.${imageFormat}`);

    await fs.writeFile(tempPicture, buffer);
    result = await resizeCover(
      tempPicture,
      'trackCover',
      55,
      36,
      'trackPictures',
    );
    fs.unlink(tempPicture);
  } catch (error) {
    console.error(error);
  }
  return result;
};

const getPictureFromAlbum = async (artist, album, imageSize = 'large') => {
  const result = await albumArt(artist, { album, size: imageSize });

  const link = await resizeCover(result, 'trackCover', 55, 36, 'trackPictures');

  return link;
};

export default {
  getPictureFromTags,
  getPictureFromAlbum,
};
