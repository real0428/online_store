const express = require('express')
const router = express.Router()
const authMiddleWare = require('../middleware/auth')
const db = require('../db')

// 新增消息分類
router.post('/news/categories', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { name, parent_id } = req.body
  const sql = `INSERT INTO news_categories (name, parent_id, owner_id) VALUES (?,?,?)`
  db.query(sql, [name, parent_id, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('建立失敗')
    res.send({
      status: 0,
      message: '建立成功'
    })
  })
})

// 刪除消息分類
router.delete('/news/categories', authMiddleWare, (req, res) => {
  const { id } = req.auth;
  const { type_id } = req.body
  const sql = `SELECT * FROM news_categories WHERE parent_id=? AND owner_id=?`
  db.query(sql, [type_id, id], (err, results) => {
    if (results.length > 0) {
      const sql = `UPDATE news_categories SET parent_id=NULL WHERE parent_id=? AND owner_id=?`
      db.query(sql, [type_id, id], (err, results) => {
        if (err) return res.cc(err)
      })
    }
    const sql = `DELETE FROM news_categories WHERE type_id=? AND owner_id=?`
    db.query(sql, [type_id, id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('刪除失敗')
      res.cc(0, '刪除成功')
    })
  })
})

// 取得所有消息分類
router.get('/news/categories', authMiddleWare, (req, res) => {
  const { id } = req.auth;
  console.log(id);
  const sql = `SELECT * FROM news_categories WHERE owner_id=?`
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)

    // 存放父層分類
    const categories = []
    // 存放子層分類
    const categoriesMap = {}

    results.forEach(item => {
      if (item.parent_id) {
        if (!categoriesMap[item.parent_id]) {
          categoriesMap[item.parent_id] = { children: [] }
        }
        categoriesMap[item.parent_id].children.push(item)
      } else {
        categories.push(item)
      }
    })

    const response = categories.map((item) => ({
      ...item,
      children: categoriesMap[item.type_id]?.children || []
    }))

    res.send({
      status: 0,
      message: '查詢成功',
      data: response
    })
  })
})

// 修改消息分類
router.put('/news/categories', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { type_id, name, parent_id } = req.body
  const sql = `UPDATE news_categories SET name=?, parent_id=? WHERE type_id=? AND owner_id=?`
  db.query(sql, [name, parent_id, type_id, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新失敗')
    res.cc(0, '更新成功')
  })
})

module.exports = router