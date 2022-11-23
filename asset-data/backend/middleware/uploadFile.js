const multer = require('multer')
const uuid = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/")
  },
  filename: function (req, file, cb) {
    let newFilename = uuid.v4()

    cb(null, newFilename.replaceAll("-", "_") + path.extname(file.originalname))
  }
})

const uploadFile = multer({ storage: storage });

module.exports = uploadFile
