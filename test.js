import path from 'path';
import { Jimp } from 'jimp';

const resizeCover = async (
  link,
  type = 'pic',
  width = 55,
  heigth = 36,
  dir = 'trackPictures',
) => {
  try {
    const fileName = link.slice(link.length / 2, link.length);

    const resizeImg = await Jimp.read(link);
    const extentionFile = resizeImg.mime.split('/')[1];

    const sizeImg = `${width}x${heigth}_`;
    const resizeFileName = `${sizeImg}${type}_${fileName}.${extentionFile}`;

    const resultUpload = path.resolve(
      'upload',
      'pictures',
      dir,
      resizeFileName,
    );

    await resizeImg
      .autocrop({ cropSymmetric: true })
      .cover({ w: width, h: heigth })
      .write(resultUpload);

    return resultUpload;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default resizeCover;

resizeCover(
  'https://i.scdn.co/image/ab67616d00001e02bb0cb31ddafd21c737dd0b73',
).then((res) => console.log(res));
