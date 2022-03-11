import { v4 as uuidv4 } from 'uuid';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import path from 'path';
import getStream from 'into-stream';
import { generateThumbnailImage } from './imageprocessing.js';

// Azure Storage Connection String
const azureStorageConnectionUrl = process.env.AZURE_STORAGE_BLOB_CONNECTION_STRING;

// Azure Storage Container name
// all images are stored in same container
const azureContainerName = process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME;

if(!azureStorageConnectionUrl
    || !azureContainerName) throw new Error("Missing Blob Storage connection information");

let azureContainerClient = null;
let azureBlobServiceClient = null;

export const connectToBlobStorage = async () => {
  azureBlobServiceClient = BlobServiceClient.fromConnectionString(azureStorageConnectionUrl);
  azureContainerClient = await azureBlobServiceClient.getContainerClient(azureContainerName);

  // public blob access
  // no public container enumeration
  await azureContainerClient.createIfNotExists({access: "blob"});
};

const writeStreamToAzureStorage = async (fileName, imageBuffer) => {
  // create blob client
  const blobFile = new BlockBlobClient(
    azureStorageConnectionUrl,
    azureContainerName,
    fileName,
  );

  // convert buffer to stream
  const stream = getStream(imageBuffer.buffer);
  const streamLength = imageBuffer.buffer.length;

  // upload stream as Azure Blob Storage
  await blobFile.uploadStream(stream, streamLength);

  // return name and url
  return blobFile;
};

export const uploadBlob = async (image) => {
  if (!image) return null;

  const { ext } = path.parse(image.originalname);

  // only images with these file
  // extensions are allowed
  if (
    !ext === '.jpg'
    || !ext === '.png'
    || !ext === '.gif'
    || !ext === '.webp'
    || !ext === '.avif') return null;

  const thumbnailBuffer = await generateThumbnailImage(image);

  // file name of image is a GUID, which provides
  // - obfuscation
  // - collision avoidance
  const thumbnailBlobFile = await writeStreamToAzureStorage(
    uuidv4(),
    thumbnailBuffer,
  );

  return { image: thumbnailBlobFile.url };
};

export const deleteBlob = async (url) => {
  // determine file name of image from url
  const parts = url.split('/');
  const fileName = parts[parts.length - 1];

  // delete image
  await azureContainerClient.deleteBlob(fileName);
};
