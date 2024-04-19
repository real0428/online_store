const express = require('express')
const router = express.Router()
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleWare = require('../middleware/auth')
const db = require('../db')
const multer = require('multer')
const upload = multer({ dest: __dirname + '../../uploads' })
require('dotenv').config()

// 賣家用戶註冊
router.post('/business_user/register', (req, res) => {
  const userInfo = req.body
  const sql = `SELECT * FROM business_users WHERE username=?`
  db.query(sql, username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length) return res.cc('該帳號已有人使用')
    userInfo.password = bycript.hashSync(password, 10)
    const sql = `INSERT INTO business_users SET ?`
    db.query(sql, userInfo, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('建立失敗')
      res.send({
        status: 0,
        message: '建立成功'
      })
    })
  })
})

// 賣家用戶登入
router.post('/business_user/login', (req, res) => {
  const { username, password } = req.body
  const sql = `SELECT * FROM business_users WHERE username=?`
  db.query(sql, username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 0) return res.status(422).cc('用戶不存在')
    const compareResult = bycript.compareSync(password, results[0].password)
    if (!compareResult) return res.status(401).cc('密碼錯誤')
    const user = {
      ...results[0],
      password: '',
      user_pic: ''
    }
    const token = jwt.sign(user, process.env.JWTSECRETKEY, { expiresIn: '2h' })
    res.send({
      status: 0,
      message: '登入成功',
      token: 'Bearer ' + token
    })
  })
})

//取得賣家用戶資料
router.get('/business_user/info', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const sql = `SELECT * FROM business_users WHERE id=?`
  db.query(sql, id, (err, results) => {
    if (err) return res.status(403).cc(err)
    if (results.length !== 1) return res.status(401).cc('無訪問權限')
    res.send({
      message: '成功',
      user: {
        ...results[0],
        password: ''
      }
    })
  })
})

//更新賣家用戶資料
router.put('/business_user/info', authMiddleWare, upload.single('image'), (req, res) => {
  const { id } = req.auth
  const file = req.file
  console.log(req.body);
  let info = {}
  if (file) {
    file.url = `http://127.0.0.1/uploads/${file.filename}`
    info = {
      ...req.body,
      user_pic: file.url
    }
  } else {
    info = {
      ...req.body
    }
  }
  const sql = `UPDATE business_users SET ? WHERE id=?`
  db.query(sql, [info, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.status(400).cc('更新失敗')
    const sql = `SELECT username, user_pic, nickname FROM business_users WHERE id=?`
    db.query(sql, id, (err, results) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '更新成功',
        data: results[0]
      })
    })
  })
})

//修改賣家用戶密碼
router.put('/business_user/pwd', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const sql = `SELECT * FROM business_users WHERE id = ?`
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length != 1) return res.status(401).cc('無修改權限')
    let { oldpwd, newpwd } = req.body
    const compareResult = bycript.compareSync(oldpwd, results[0].password)
    if (!compareResult) return res.cc('原密碼錯誤')
    newpwd = bycript.hashSync(newpwd, 10)
    const sql = `UPDATE business_users SET password=? WHERE id=?`
    db.query(sql, [newpwd, id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新失敗')
      res.cc(0, '更新成功')
    })
  })
})


module.exports = router