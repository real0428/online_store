const express = require('express')
const router = express.Router()
const db = require('../db')
const authMiddleWare = require('../middleware/auth')
const moment = require('moment')
const multer = require('multer')
const upload = multer({ dest: __dirname + '../../uploads' })

// 查詢賣家所有商品
router.get('/product/item', authMiddleWare, (req, res) => {
  const { id } = req.auth
  console.log('id', id);
  let sql = 'SELECT * FROM products WHERE owner_id=?'
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length < 1) return res.cc('查無資料')
    res.send({
      status: 0,
      message: '商品查詢成功',
      data: results
    })
  })
})

// 查詢賣家特定商品
router.get('/product/item/:itemId', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { itemId } = req.params
  let sql = `SELECT * FROM products WHERE item_id=? AND owner_id=?`
  db.query(sql, [itemId, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.length < 1) return res.cc('查無資料')
    res.send({
      status: 0,
      message: '商品查詢成功',
      data: results
    })
  })
})

// 建立商品
router.post('/product/item', authMiddleWare, upload.single('image'), (req, res) => {
  const { id } = req.auth
  const file = req.file
  if (!file) return res.status(400).cc('未上傳檔案')
  file.url = `http://127.0.0.1/uploads/${file.filename}`
  const product = {
    ...req.body,
    image_url: file.url,
    owner_id: id
  }
  const sql = `INSERT INTO products SET ?`;
  db.query(sql, product, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('商品建立失敗')
    res.cc('商品建立成功', 0)
  })
})

// 移除商品
router.delete('/product/item', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { item_id } = req.body
  console.log(item_id);
  const sql = `DELETE FROM products WHERE item_id=? AND owner_id=?`
  db.query(sql, [item_id, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('商品移除失敗')
    res.cc('商品移除成功', 0)
  })
})

// 修改商品資訊
router.put('/product/item', authMiddleWare, upload.single('image'), (req, res) => {
  const { id } = req.auth
  const file = req.file
  let product = {}
  const sql = `UPDATE products SET ? WHERE item_id=? AND owner_id=?`
  const currentDate = moment();
  const formatedDate = currentDate.format('YYYY-MM-DD HH:mm:ss')

  if (file) {
    file.url = `http://127.0.0.1/uploads/${file.filename}`
    product = {
      ...req.body,
      update_time: formatedDate,
      image_url: file.url
    }
  } else {
    product = {
      ...req.body,
      update_time: formatedDate,
    }
  }

  db.query(sql, [product, product.item_id, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('商品更新失敗')
    res.send({
      status: 0,
      message: '商品更新成功'
    })
  })
})

module.exports = router