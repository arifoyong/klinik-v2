const express = require('express')
const user = require('../controllers/user.controller')

const router = express.Router()
// const {isAuthorized} = require('../middleware/isAuthorized')

router.get('/', user.getAllUsers)
router.get('/:email', user.getUserByEmail)
// router.put('/:id', uploadFile.single('assetImg'), asset.updateAsset)
// router.delete('/:id', asset.deleteAsset)

module.exports = router