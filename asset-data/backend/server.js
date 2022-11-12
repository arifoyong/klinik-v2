const express = require('express')
const cors = require('cors')
const assetRouter = require('./routes/asset.router')

const PORT = 5000
const app = express()

app.use(cors({
  origin: '*'
}))
app.use(express.json())

app.get('/api', (req,res) => {
  res.send('test')
})
app.use('/api/asset', assetRouter)

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`))