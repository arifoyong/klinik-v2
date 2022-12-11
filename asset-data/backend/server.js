const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const assetRouter = require('./routes/asset.router')
const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')
const { errorResponder, invalidPathHandler } = require('./middleware/errorHandling')

const PORT = process.env.NODE_LOCAL_PORT || 5000
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

const app = express()

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser());
app.use(express.static('public'))

app.get('/api', (req,res) => res.status(200).json({msg: "Welcome API"}))
app.use('/api/asset', assetRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.use(errorResponder)
app.use(invalidPathHandler)

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`))