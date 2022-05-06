const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

// start function area
function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}`;

  //define the storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOADS_FOLDER);
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname);
      const fileName =
        path.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split("")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, res, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createdError(error_msg));
      }
    },
  });

  return upload;
}

module.exports = uploader;
