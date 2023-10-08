const express = require('express')
const router = express.Router()

router.post('/admin/login', (req, res) => {
  res.send('admin_login')
})

module.exports = router