const express = require('express')
const router = express.Router()
const authMiddleWare = require('../middleware/auth')
const db = require('../db')

// 新增消息分類
router.post('/news/categories', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { name, parent_id } = req.body
  console.log(name);
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
      console.log(type_id, id, results);
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('刪除失敗')
      res.cc(0, '刪除成功')
    })
  })
})

// 取得賣家所有消息分類
router.get('/news/categories', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const sql = `
    SELECT 
      t1.type_id,
      t1.name,
      t1.parent_id,
      t1.owner_id,
      t2.name AS parent_name
    FROM 
      news_categories t1
      LEFT JOIN news_categories t2 ON t1.parent_id = t2.type_id
    WHERE 
      t1.owner_id = ?
  `;

  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err);

    /* const buildTree = (parentId) => {
      const children = results.filter(item => item.parent_id === parentId)
        .map(item => ({
          ...item,
          children: buildTree(item.type_id)
        }))
      return children.length > 0 ? children : []
    }

    // 初始化建立tree
    const tree = buildTree(null) */

    res.send({
      status: 0,
      message: '查詢成功',
      data: results,
    });
  });
});

// 修改消息分類
router.put('/news/categories', authMiddleWare, (req, res) => {
  const { id } = req.auth
  const { type_id, name, parent_id } = req.body
  const sql = `UPDATE news_categories SET name=?, parent_id=? WHERE type_id=? AND owner_id=?`
  db.query(sql, [name, parent_id, type_id, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新失敗')
    res.cc('更新成功', 0)
  })
})

module.exports = router