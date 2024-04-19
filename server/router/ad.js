const express = require('express')
const router = express.Router()
const authMiddleWare = require('../middleware/auth')
const db = require('../db')

// 查詢所有廣告id, 名稱
router.get('/ads', authMiddleWare, (req, res) => {
  const { id: owner_id } = req.auth
  const sql = `SELECT type_id, type_name FROM ad WHERE owner_id=?`
  db.query(sql, owner_id, (err, results) => {
    if (err) throw new Error(err)
    res.send({
      status: 0,
      message: '成功',
      data: results
    })
  })
})

// 查詢單一廣告的資料
router.get('/ad', (req, res) => {
  const { type_id } = req.query
  const sql = `SELECT * FROM ad WHERE type_id=?`
  db.query(sql, type_id, (err, results) => {
    if (err) throw new Error(err)
    res.send({
      status: 0,
      message: '成功',
      data: results
    })
  })
})

// 建立廣告
router.post('/ad', authMiddleWare, (req, res) => {
  const { id: owner_id } = req.auth
  const { type_name, ads } = req.body

  const ad = {
    type_name,
    images: JSON.stringify(ads),
    owner_id
  }

  const sql = `INSERT INTO ad SET ?`
  db.query(sql, ad, (err, results) => {
    if (err) throw new Error(err)
    if (results.affectedRows !== 1) return res.status(403).cc('建立失敗')
    res.send({
      status: 0,
      message: '建立成功',
    })
  })
})

// 編輯廣告
router.put('/ad', authMiddleWare, (req, res) => {
  const { owner_id } = req.auth
  const { type_id, data } = req.body
  const sql = `UPDATE ad SET ? WHERE type_id=? AND owner_id=? `
  db.query(sql, [data, type_id, owner_id], (err, results) => {
    if (err) throw new Error(err)
    if (results.affectedRows !== 1) return res.status(403).cc('更新失敗')
    res.send({
      status: 0,
      message: '更新成功'
    })
  })
})

router.delete('/ad', authMiddleWare, (req, res) => {
  const { id: owner_id } = req.auth
  const { type_id } = req.body
  console.log(type_id)
  const sql = `DELETE FROM ad WHERE type_id=? AND owner_id=?`
  db.query(sql, [type_id, owner_id], (err, results) => {
    if (err) throw new Error(err)
    if (results.affectedRows !== 1) return res.status(403).cc('刪除失敗')
    res.send({
      status: 0,
      message: '刪除成功'
    })
  })
})

module.exports = router