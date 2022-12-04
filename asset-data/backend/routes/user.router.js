const express = require('express')
const user = require('../controllers/user.controller')

const router = express.Router()

router.get('/', user.getAllUsers)
router.get('/:email', user.getUserByEmail)
router.post('/', user.createUser)
// router.put('/:id', uploadFile.single('assetImg'), asset.updateAsset)
// router.delete('/:id', asset.deleteAsset)

module.exports = router