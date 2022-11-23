const express = require('express')
const cors = require('cors')
// const fileUpload = require('express-fileupload')
const assetRouter = require('./routes/asset.router')

const PORT = process.env.NODE_LOCAL_PORT || 5000
const app = express()

app.use(cors({origin: '*'}))
app.use(express.json())
// app.use(fileUpload())
app.use(express.static('public'))

app.get('/api', (req,res) => {
  res.status(200).json({msg: "Welcome API"})
})
app.use('/api/asset', assetRouter)

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`))