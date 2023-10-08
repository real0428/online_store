const express = require('express')
const router = express.Router()
const db = require('../db')

// 取得單一或多個商品資訊
router.get('/product/item', (req, res) => {
  const { item_id } = req.body
  let sql = 'SELECT * FROM products'
  if (item_id) sql = `SELECT * FROM products WHERE item_id=?`
  db.query(sql, item_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length < 1) return res.cc('商品查詢失敗')
    res.send({
      status: 0,
      message: '商品查詢成功',
      data: results
    })
  })
})

// 建立商品
router.post('/product/item', (req, res) => {
  const product = req.body
  const sql = `INSERT INTO products SET ?`;
  db.query(sql, product, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows != 1) return res.cc('商品建立失敗')
    res.cc(0, '商品建立成功')
  })
})

// 移除商品
router.delete('/product/item', (req, res) => {
  const { item_id } = req.body
  const sql = `DELETE FROM products WHERE item_id=?`
  db.query(sql, item_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows != 1) return res.cc('商品移除失敗')
    res.cc(0, '商品移除成功')
  })
})

// 修改商品資訊
router.put('/product/item', (req, res) => {
  const { item_id } = req.body
  const product = req.body
  const sql = `UPDATE products SET ? WHERE item_id=?`
  db.query(sql, [product, item_id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows != 1) return res.cc('商品更新失敗')
    res.send({
      status: 0,
      message: '商品更新成功'
    })
  })
})

module.exports = router