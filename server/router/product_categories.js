const express = require('express')
const router = express.Router()
const authMiddleWare = require('../middleware/auth')
const db = require('../db')

// 新增產品分類
router.post('/product/categories', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { name, parent_id } = req.body
  const sql = `INSERT INTO product_categories (name, parent_id, owner_id) VALUES (?,?,?)`
  db.query(sql, [name, parent_id, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('建立失敗')
    res.send({
      status: 0,
      message: '建立成功'
    })
  })
})

// 刪除產品分類
router.delete('/product/categories', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { type_id } = req.body
  const sql = `SELECT * FROM product_categories WHERE parent_id=? AND owner_id=?`
  db.query(sql, [type_id, id], (err, results) => {
    if (results.length > 0) {
      const sql = `UPDATE product_categories SET parent_id=NULL WHERE parent_id=? AND owner_id=?`
      db.query(sql, [type_id, id], (err, results) => {
        if (err) return res.cc(err)
      })
    }
    const sql = `DELETE FROM product_categories WHERE type_id=? AND owner_id=?`
    db.query(sql, [type_id, id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('刪除失敗')
      res.cc(0, '刪除成功')
    })
  })
})

//取得賣家所有產品分類
router.get('/product/categories', authMiddleWare, (req, res) => {
  const { owner_id } = req.query
  const { id } = req.auth
  const sql = `
    SELECT 
      t1.type_id,
      t1.name,
      t1.parent_id,
      t1.owner_id,
      t2.name AS parent_name
    FROM 
      product_categories t1
      LEFT JOIN product_categories t2 ON t1.parent_id = t2.type_id
    WHERE 
      t1.owner_id = ?
  `;


  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)

    res.send({
      status: 0,
      message: '查詢成功',
      data: results
    })
  })
})

// 更新產品分類
router.put('/product/categories', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { type_id, name, parent_id } = req.body
  const sql = `UPDATE product_categories SET name=?, parent_id=? WHERE type_id=? AND owner_id=?`
  db.query(sql, [name, parent_id, type_id, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新失敗')
    res.cc('更新成功', 0)
  })
})

module.exports = router