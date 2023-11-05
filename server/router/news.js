const express = require('express')
const router = express.Router()
const db = require('../db')
const authMiddleWare = require('../middleware/auth')
const moment = require('moment')

// 查詢特定賣家所有消息
router.get('/news/post', (req, res) => {
  const { owner_id } = req.query
  let sql = `SELECT * FROM news WHERE owner_id=?`
  db.query(sql, owner_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length < 1) return res.cc('查無資料')
    res.send({
      status: 0,
      message: '消息查詢成功',
      data: results
    })
  })
})

// 查詢特定賣家特定消息
router.get('/news/post/:id', (req, res) => {
  const { owner_id } = req.query
  const { id } = req.params
  let sql = `SELECT * FROM news WHERE item_id=? AND owner_id=?`
  db.query(sql, [id, owner_id], (err, results) => {
    if (err) return res.cc(err)
    if (results.length < 1) return res.cc('查無資料')
    res.send({
      status: 0,
      message: '消息查詢成功',
      data: results
    })
  })
})

// 建立消息
router.post('/news/post', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const product = {
    ...req.body,
    owner_id: id
  }
  const sql = `INSERT INTO news SET ?`;
  db.query(sql, product, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('消息建立失敗')
    res.cc(0, '消息建立成功')
  })
})

// 移除消息
router.delete('/news/post', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { item_id } = req.body
  const sql = `DELETE FROM news WHERE item_id=? AND owner_id=?`
  db.query(sql, [item_id, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('消息移除失敗')
    res.cc(0, '消息移除成功')
  })
})

// 修改消息資訊
router.put('/news/post', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const product = req.body
  const sql = `UPDATE news SET ? WHERE item_id=? AND owner_id=?`
  const currentDate = moment()
  const formatedDate = currentDate.format('YYYY-MM-DD HH:mm')
  product.update_time = formatedDate
  db.query(sql, [product, product.item_id, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('消息更新失敗')
    res.send({
      status: 0,
      message: '消息更新成功'
    })
  })
})

module.exports = router