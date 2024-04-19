const express = require('express')
const router = express.Router()
const db = require('../db')
const authMiddleWare = require('../middleware/auth')
const moment = require('moment')
const multer = require('multer')
const upload = multer({ dest: __dirname + '../../uploads' })

// 查詢特定賣家所有消息
router.get('/news/post', authMiddleWare, (req, res) => {
  const { id } = req.auth
  let sql = `SELECT * FROM news WHERE owner_id=?`
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length < 1) return res.cc('查無資料')
    res.send({
      status: 0,
      message: '查詢成功',
      data: results
    })
  })
})

// 查詢特定賣家特定消息
router.get('/news/post/:newsId', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { newsId } = req.params
  console.log(newsId);
  let sql = `SELECT * FROM news WHERE item_id=? AND owner_id=?`
  db.query(sql, [newsId, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.length < 1) return res.cc('查無資料')
    res.send({
      status: 0,
      message: '查詢成功',
      data: results
    })
  })
})

// 建立消息
router.post('/news/post', authMiddleWare, upload.single('image'), (req, res) => {
  const { id } = req.auth
  const file = req.file
  if (!file) return res.status(400).cc('未上傳檔案')
  file.url = `http://127.0.0.1/uploads/${file.filename}`
  const news = {
    ...req.body,
    img_url: file.url,
    owner_id: id
  }
  const sql = `INSERT INTO news SET ?`;
  db.query(sql, news, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.status(400).cc('建立失敗')
    res.cc('建立成功', 0)
  })
})

// 移除消息
router.delete('/news/post', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { item_id } = req.body
  console.log(id, item_id);
  const sql = `DELETE FROM news WHERE item_id=? AND owner_id=?`
  db.query(sql, [item_id, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.status(400).cc('移除失敗')
    res.cc(0, '移除成功')
  })
})

// 修改消息資訊
router.put('/news/post', authMiddleWare, upload.single('image'), (req, res) => {
  const { id } = req.auth
  const file = req.file
  const currentDate = moment()
  const formatedDate = currentDate.format('YYYY-MM-DD HH:mm:ss')
  let news = {}
  // 如果有檔案，就更新圖片路徑
  if (file) {
    file.url = `http://127.0.0.1/uploads/${file.filename}`
    news = {
      ...req.body,
      update_time: formatedDate,
      img_url: file.url
    }
  } else {
    news = {
      ...req.body,
      update_time: formatedDate,
    }
  }
  const sql = `UPDATE news SET ? WHERE item_id=? AND owner_id=?`
  db.query(sql, [news, news.item_id, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新失敗')
    res.send({
      status: 0,
      message: '更新成功'
    })
  })
})

module.exports = router