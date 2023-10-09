const express = require('express')
const router = express.Router()
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleWare = require('../middleware/auth')
const db = require('../db')
require('dotenv').config()

// 賣家註冊
router.post('/business_user/register', (req, res) => {
  const userInfo = req.body
  const { username, password } = userInfo
  const sql = `SELECT * FROM business_users WHERE username=?`
  db.query(sql, username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length) return res.cc('該帳號已有人使用')
    userInfo.password = bycript.hashSync(password, 10)
    const sql = `INSERT INTO business_users SET ?`
    db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows != 1) return res.cc('建立失敗')
      res.send({
        status: 0,
        message: '建立成功'
      })
    })
  })
})

// 賣家登入
router.post('/business_user/login', (req, res) => {
  const { username, password } = req.body
  const sql = `SELECT * FROM business_users WHERE username=?`
  db.query(sql, username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 0) return res.status(422).cc('用戶不存在')
    const compareResult = bycript.compareSync(password, results[0].password)
    if (!compareResult) return res.cc('密碼錯誤')
    const user = {
      ...results[0],
      password: '',
      user_pic: ''
    }
    const token = jwt.sign(user, process.env.JWTSECRETKEY, { expiresIn: '10h' })
    res.send({
      status: 0,
      message: '登入成功',
      token: 'Bearer ' + token
    })
  })
})

module.exports = router