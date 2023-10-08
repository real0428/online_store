const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/comments', (req, res) => {
  const { product_id, comment_id } = req.body
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

module.exports = router

