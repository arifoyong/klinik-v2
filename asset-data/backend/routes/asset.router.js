const express = require('express')
const router = express.Router()
const asset = require('../controllers/asset.controller')

router.get('/', asset.getAllAsset)
router.get('/:id', asset.findAssetById)
router.post('/', asset.createAsset)
router.put('/:id', asset.updateAsset)
router.delete('/:id', asset.deleteAsset)

module.exports = router