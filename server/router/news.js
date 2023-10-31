const express = require('express')
const router = express.Router()
const db = require('../db')
const moment = require('moment')

// 取得單一或多個消息資訊
router.get('/news/post', (req, res) => {
  const { item_id } = req.body
  let sql = 'SELECT * FROM news'
  if (item_id) sql = `SELECT * FROM news WHERE item_id=?`
  db.query(sql, item_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length < 1) return res.cc('消息查詢失敗')
    res.send({
      status: 0,
      message: '消息查詢成功',
      data: results
    })
  })
})

// 建立消息
router.post('/news/post', (req, res) => {
  const product = req.body
  const sql = `INSERT INTO news SET ?`;
  db.query(sql, product, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('消息建立失敗')
    res.cc(0, '消息建立成功')
  })
})

// 移除消息
router.delete('/news/post', (req, res) => {
  const { item_id } = req.body
  const sql = `DELETE FROM news WHERE item_id=?`
  db.query(sql, item_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('消息移除失敗')
    res.cc(0, '消息移除成功')
  })
})

// 修改消息資訊
router.put('/news/post', (req, res) => {
  const { item_id } = req.body
  const product = req.body
  const sql = `UPDATE news SET ? WHERE item_id=?`
  const currentDate = moment()
  const formatedDate = currentDate.format('YYYY-MM-DD HH:mm')
  product.update_time = formatedDate
  db.query(sql, [product, item_id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('消息更新失敗')
    res.send({
      status: 0,
      message: '消息更新成功'
    })
  })
})

module.exports = router