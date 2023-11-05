const express = require('express')
const router = express.Router()
const db = require('../db')
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authMiddleWare = require('../middleware/auth')

//買家用戶註冊
router.post('/user/register', (req, res) => {
  const userInfo = req.body
  const sql = `SELECT * FROM users WHERE username=?`;
  db.query(sql, userInfo.username, (err, results) => {
    if (results.length > 0) res.cc('該用戶名有人使用!')
    userInfo.password = bycript.hashSync(userInfo.password, 10)
    const sql = `INSERT INTO users SET ?`
    db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('註冊失敗!')
      res.cc('註冊成功!', 0)
    })
  })
})

//買家用戶登入
router.post('/user/login', (req, res) => {
  const { username, password } = req.body
  const sql = `SELECT * FROM users WHERE username=?`
  db.query(sql, username, (err, results) => {
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
      message: '登入成功!',
      token: 'Bearer ' + token
    })
  })
})

//取得買家用戶資料
router.get('/user/info', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const sql = `SELECT * FROM users WHERE id=?`
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)
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

//更新買家用戶資料
router.put('/user/info', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { nickname, email, user_pic } = req.body
  const sql = `UPDATE users SET ? WHERE id=?`
  db.query(sql, [{ nickname, email, user_pic }, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('資料更新失敗')
    res.cc(0, '資料更新成功')
  })
})

//修改買家用戶密碼
router.put('/user/pwd', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const sql = `SELECT * FROM users WHERE id = ?`
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length != 1) return res.status(401).cc('無修改權限')
    let { oldpwd, newpwd } = req.body
    const compareResult = bycript.compareSync(oldpwd, results[0].password)
    if (!compareResult) return res.cc('原密碼錯誤')
    newpwd = bycript.hashSync(newpwd, 10)
    const sql = `UPDATE users SET password=? WHERE id=?`
    db.query(sql, [newpwd, id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('密碼更新失敗')
      res.cc(0, '密碼更新成功')
    })
  })
})

module.exports = router