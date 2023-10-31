const express = require('express')
const router = express.Router()
const db = require('../db')

// 取得評論
router.get('/product/comment', (req, res) => {
  const { product_id } = req.body
  const sql = `SELECT * FROM comments WHERE product_id=?`
  db.query(sql, product_id, (err, results) => {
    if (err) return res.cc(err)
    if (!results.length) return res.cc('查詢失敗')
    // 存放評論的父資料
    const comments = []
    // 存放評論的子資料
    const commentMap = {}

    results.forEach((item) => {
      if (item.comment_parent_id) {
        if (!commentMap[item.comment_parent_id]) {
          commentMap[item.comment_parent_id] = { children: [] }
        }
        commentMap[item.comment_parent_id].children.push(item)
      } else {
        comments.push(item)
      }
    })

    const response = comments.map((item) => ({
      ...item,
      children: commentMap[item.comment_id]?.children || []
    }))

    res.send({
      status: 0,
      data: response
    })
  })
})

//建立評論
router.post('/product/comment', (req, res) => {
  const comment = req.body
  const sql = `INSERT INTO comments SET ?`
  db.query(sql, comment, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('建立失敗')
    res.send({
      status: 0,
      message: '建立成功',
      data: comment
    })
  })
})

module.exports = router

