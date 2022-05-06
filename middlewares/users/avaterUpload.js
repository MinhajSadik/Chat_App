const uploader = require("../../utilities/singleUploader");

function avaterUpload(req, res, next) {
  const upload = uploader(
    "avaters",
    ["image/jpeg", "image/png", "image/jpg"],
    "1000000",
    "Only .jpg, .jpeg, .png files are allowed"
  );
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avater: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avaterUpload;
