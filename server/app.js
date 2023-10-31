const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user')
const businessUserRouter = require('./router/business_user')
const productCateRouter = require('./router/product_categories')
const newsCateRouter = require('./router/news_categories')
const productRouter = require('./router/product')
const newsRouter = require('./router/news')
const commentRouter = require('./router/comment')
const cartRouter = require('./router/cart')
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use('public', express.static('public'))

// 訊息回應中間件
app.use((req, res, next) => {
  res.cc = function (message, status = 1) {
    res.send({
      message,
      status
    })
  }
  next()
})

app.use('/api', businessUserRouter)
app.use('/api', userRouter)
app.use('/api', productCateRouter)
app.use('/api', newsCateRouter)
app.use('/api', productRouter)
app.use('/api', newsRouter)
app.use('/api', commentRouter)
app.use('/api', cartRouter)

// 錯誤處理中間件
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') return res.cc('身份認證失敗')
  return res.cc(err)
})

app.listen(80, () => {
  console.log('server is running at http://127.0.0.1');
})
