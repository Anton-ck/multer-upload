import * as mm from 'music-metadata';

const getId3Tags = async (url) => {
  const metadata = await mm.parseFile(url, { duration: true });

  return metadata;
};

export default getId3Tags;
