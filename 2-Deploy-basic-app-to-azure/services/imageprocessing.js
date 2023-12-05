import sharp from 'sharp';

// Convert original image into standard size
// for this app
// in PNG format
export const generateThumbnailImage = async (image) => {
  if (!image) return null;

  const width = 400;
  const height = 400;

  return await sharp(image.buffer).resize(width, height).png().toBuffer();
};