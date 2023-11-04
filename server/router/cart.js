const express = require('express')
const router = express.Router()
const authMiddleWare = require('../middleware/auth')
const db = require('../db')

// 查詢購物車
router.get('/cart', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const sql = `SELECT * FROM shopping_cart WHERE user_id=?`
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '查詢成功',
      data: results
    })
  })
})

// 商品加入購物車
router.post('/cart', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { item_id } = req.body
  const sql = `SELECT * FROM shopping_cart WHERE item_id=? AND user_id=?`
  db.query(sql, [item_id, id], (err, cartItemRes) => {
    if (err) return res.cc(err)
    // 查看商品是否有庫存
    const sql = `SELECT quantity FROM products WHERE item_id=?`
    db.query(sql, item_id, (err, productRes) => {
      if (err) return res.cc(err)
      if (!productRes.length) {
        return res.cc('商品已售完')
      } else {
        const cartItem = {
          ...req.body,
          user_id: id,
        }
        console.log(cartItem);
        // 當使用者的購物車沒有這項商品
        if (!cartItemRes.length) {
          const sql = `INSERT INTO shopping_cart SET ?`
          db.query(sql, cartItem, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('無法加入購物車，請聯絡管理員')
            res.cc(0, '已加入購物車')
          })
          // 當使用者的購物車已有這項商品
        } else {
          const amount = cartItemRes[0].amount + parseInt(cartItem.amount, 10)
          if (productRes[0].quantity < amount) {
            return res.cc('抱歉，商品庫存不足')
          }

          const sql = `UPDATE shopping_cart SET amount =? WHERE item_id=?`
          db.query(sql, [amount, item_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('無法加入購物車，請聯絡管理員')
            res.cc(0, '已更新購物車商品數量')
          })
        }
      }
    })
  })
})

// 更新購物車商品數量
router.put('/cart', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { item_id, amount } = req.body
  const sql = `UPDATE shopping_cart SET amount=? WHERE user_id=? AND item_id=?`
  db.query(sql, [amount, id, item_id], (err, results) => {
    if (err) throw new Error(err)
    if (results.affectedRows !== 1) return res.cc('更新失敗')
    res.send({
      status: 0,
      message: '更新成功'
    })
  })
})

// 移除購物車商品
router.delete('/cart', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { item_id } = req.body
  const sql = `DELETE FROM shopping_cart WHERE user_id=? AND item_id=?`
  db.query(sql, [id, item_id], (err, results) => {
    if (err) throw new Error(err)
    console.log(results);
    if (results.affectedRows !== 1) return res.cc('刪除失敗')
    res.send({
      status: 0,
      message: '刪除成功'
    })
  })
})

module.exports = router

