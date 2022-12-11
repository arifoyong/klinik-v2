const db = require('../services/db')
const Asset = require('../models/asset')()

const STATIC_IMG_DIR=_DIR = process.env.STATIC_IMG_DIR || 'http://localhost:8000/images'

const getAllAsset = async (req, res, next) => {
  try {
    const assets = await Asset.findAll()
    return  res.status(200).json(assets);
  } catch (err) {
    next(err)
  }
}

const countAsset = async (req, res, next) => {
  try {
    const assetCount = await Asset.countAsset()
    return  res.status(200).json(assetCount);
  } catch (err) {
    next(err)
  }
}

const findAssetById = async (req, res, next) => {
  try {
    const asset = await Asset.findOne("id", req.params.id)
    return  res.status(200).json(asset);
  } catch (err) {
    
    next(err)
  }
 }

const createAsset = async (req, res, next) => {
  try {
    let body = req.body
    if (typeof req.file !== 'undefined' && req.file) {
      body.img_uri = `${STATIC_IMG_DIR}/${req.file.filename}`
    }
  
    const result = await Asset.createAsset(body)
    return res.status(200).json(result) 
  } catch (err) {
    next(err)
  }
 }


 const updateAsset = async (req, res) => {
   try {
     let body = req.body
     body.id = req.params.id
     if (typeof req.file !== 'undefined' && req.file) {
       body.img_uri = `${STATIC_IMG_DIR}/${req.file.filename}`
     }
     
   
     const result = await Asset.updateAsset(body)
     return res.status(200).json(result) 
   } catch (err) {
     next(err)
   }
}

const deleteAsset = async (req, res) => {
  try {
    const result = await Asset.deleteAsset({id: req.params.id})
    return res.status(200).json(result) 
  } catch (err) {
    next(err)
  }
}

 module.exports = {
  findAssetById,
  countAsset,
  getAllAsset,
  createAsset,
  updateAsset,
  deleteAsset
 }