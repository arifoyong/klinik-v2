const express = require('express')
const {signUp, signIn, authenticateToken, signOut} = require('../controllers/auth.controller')

const router = express.Router()

router.get('/', authenticateToken)
router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/signout', signOut)
// router.put('/:id', uploadFile.single('assetImg'), asset.updateAsset)
// router.delete('/:id', asset.deleteAsset)

module.exports = router