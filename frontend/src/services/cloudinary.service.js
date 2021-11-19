import axios from 'axios';
export const cloudinaryService = { uploadFile };

const CLOUD_NAME = 'avivyaari';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = 'k9e87w7t';

async function uploadFile(ev) {
  const formData = new FormData();
  formData.append('file', ev.target.files[0]);
  formData.append('upload_preset', UPLOAD_PRESET);
  try {
    const res = await axios.post(UPLOAD_URL, formData);
    return res.data.url;
  } catch (err) {
    throw err;
  }
}
