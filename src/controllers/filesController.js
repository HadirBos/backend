const path = require("path");
const asyncHandler = require("express-async-handler");
const { cloudinary } = require("../config/cloudinary");
const streamifier = require("streamifier");

// @desc    Upload a file to Cloudinary
// @route   POST /api/files/upload
// @access  Private
const uploadFile = asyncHandler(async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No files were uploaded" });
  }

  const file = req.files.file;
  const userId = req.user._id;

  const originalFileName = file.name || "untitled";
  const ext = path.extname(originalFileName);
  const baseName = path.parse(originalFileName).name;

  const timestamp = Date.now();
  const uniqueName = `${timestamp}_${baseName}`;

  const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `hadirbos/${userId}`,
          resource_type: "auto",
          public_id: uniqueName,
          overwrite: false,
          type: "upload",
          access_mode: "public",
        },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  };

  try {
    const result = await streamUpload(file.data);
    // Langsung kirim URL Cloudinary
    res.status(200).json({ fileUrl: result.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res
      .status(500)
      .json({ message: `Cloudinary upload error: ${error.message}` });
  }
});

module.exports = { uploadFile };
