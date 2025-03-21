import path from 'path';
import { Jimp } from 'jimp';

const resizeCover = async (
  link,
  type = 'pic',
  width = 60,
  heigth = 60,
  dir = 'allPictures',
) => {
  try {
    const fileName = Date.now();

    const resizeImg = await Jimp.read(link);

    const extentionFile = resizeImg.mime.split('/')[1];

    const sizeImg = `${width}x${heigth}_`;
    const resizeFileName = `${sizeImg}${type}_${fileName}.${extentionFile}`;
    const arrPath = ['pictures', dir, resizeFileName];
    const resultUpload = path.resolve('upload', ...arrPath);

    await resizeImg
      .autocrop({ cropSymmetric: true })
      .cover({ w: width, h: heigth })
      .write(resultUpload);

    return path.join(...arrPath);
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default resizeCover;
