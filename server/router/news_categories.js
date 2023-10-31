const express = require('express')
const router = express.Router()
const db = require('../db')

// 新增消息分類
router.post('/news/categories', (req, res) => {
  const { name, parent_id } = req.body
  const sql = `INSERT INTO news_categories (name, parent_id) VALUES (?,?)`
  db.query(sql, [name, parent_id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('分類建立失敗')
    res.send({
      status: 0,
      message: '分類建立成功'
    })
  })
})

// 刪除消息分類
router.delete('/news/categories', (req, res) => {
  const { type_id } = req.body
  const sql = `SELECT * FROM news_categories WHERE parent_id=?`
  db.query(sql, type_id, (err, results) => {
    if (results.length > 0) {
      const sql = `UPDATE news_categories SET parent_id=NULL WHERE parent_id=?`
      db.query(sql, type_id, (err, results) => {
        if (err) return res.cc(err)
      })
    }
    const sql = `DELETE FROM news_categories WHERE type_id=?`
    db.query(sql, type_id, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('分類刪除失敗')
      res.cc(0, '分類刪除成功')
    })
  })
})

// 取得所有消息分類
router.get('/news/categories', (req, res) => {
  const sql = `SELECT * FROM news_categories`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '分類查詢成功',
      data: [...results]
    })
  })
})

// 修改消息分類
router.put('/news/categories', (req, res) => {
  const { type_id, name, parent_id } = req.body
  const sql = `UPDATE news_categories SET name=?, parent_id=? WHERE type_id=?`
  db.query(sql, [name, parent_id, type_id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('分類更新失敗')
    res.cc(0, '分類更新成功')
  })
})

module.exports = router