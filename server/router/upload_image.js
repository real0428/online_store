const express = require('express')
const router = express.Router()
const db = require('../db')
const authMiddleWare = require('../middleware/auth')

const multer = require('multer')
const upload = multer({ dest: __dirname + '../../uploads' })

router.post('/upload_image', upload.single('file'), (req, res) => {
  const file = req.file
  if (!file) return res.status(400).cc('未收到檔案!')
  file.url = `http://127.0.0.1/uploads/${file.filename}`
  res.send({
    data: { imgUrl: file.url }
  })
})

module.exports = router
