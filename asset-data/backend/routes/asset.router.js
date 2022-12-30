const express = require('express')
const asset = require('../controllers/asset.controller')
const uploadFile= require('../middleware/uploadFile')
// const isAuthorized = require('../middleware/isAuthorized')

const router = express.Router()

router.get('/', asset.getAllAsset)
router.get('/count', asset.countAsset)
router.get('/:id', asset.findAssetById)
router.post('/', uploadFile.single('assetImg'), asset.createAsset)
router.put('/:id', uploadFile.single('assetImg'), asset.updateAsset)
router.delete('/:id', asset.deleteAsset)

module.exports = router