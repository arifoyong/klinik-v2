const express = require('express')
const cors = require('cors')
const assetRouter = require('./routes/asset.router')
const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')

const PORT = process.env.NODE_LOCAL_PORT || 5000
const app = express()


var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: false
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))


app.get('/api', (req,res) => res.status(200).json({msg: "Welcome API"}))
app.use('/api/asset', assetRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`))