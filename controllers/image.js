const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cấu hình Multer để upload lên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage }).single('image');

const uploadImage = async (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded!' });
      }
      res.json({
        success: true,
        message: 'Upload image successful!',
        data: {
          image: req.file.path,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message, status: 400 });
  }
};

module.exports = { uploadImage };
