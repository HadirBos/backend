const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const testCloudinaryConnection = async () => {
  try {
    const result = await cloudinary.api.ping();
    console.log("Cloudinary connected successfully:", result);
    return true;
  } catch (error) {
    console.error("Cloudinary connection failed:", error.message);
    return false;
  }
};

module.exports = {
  cloudinary,
  testCloudinaryConnection,
};
