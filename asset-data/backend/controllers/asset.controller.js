const db = require('../services/db')
const STATIC_IMG_DIR=_DIR = process.env.STATIC_IMG_DIR || 'http://localhost:8000/images'

const getAllAsset = (req, res, next) => {
  db.query("select * from asset", (err, data, fields) => {
    if (err)  return res.status(400).json({status: "error", error: err.message})

    return res.status(200).json({status: "success", data: data});
  })
}

const findAssetById = (req, res) => {
  let id = req.params.id
  let query =`Select * from asset where id = ?`

  db.query(query, [id], (err, data, fields) => {
    if (err)  return res.status(400).json({status: "error", error: err.message})
    if (data.length == 0)  return res.status(400).json({status: "error", error: "record not found"})

    return res.status(200).json({ status: "success", data: data });
  })
 }

const createAsset = (req, res) => {
  if (!req.body)  return res.status(400).json({status: "error", error: "no request body found"})

  let { name, 
      brand, 
      spec, 
      quantity, 
      price, 
      delivery_cost = 0, 
      delivery_date, 
      vendor, 
      website = '', 
      address = '', 
      contact = '', 
      phone = '',
      img_uri = '' } = req.body

  if (req.files !== null) {
    const assetImg  = req.files.assetImg
    const assetImgNewPath = `${__dirname}/../public/images/${assetImg.name}`
    img_uri = `${STATIC_IMG_DIR}/${assetImg.name}`

    assetImg.mv(assetImgNewPath, (err) => {
      if (err)  return res.status(500).json({status: "error", error: err.message})
    })
  }
  
  let query = `insert into asset (name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone, img_uri) 
  values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  db.query(query, [name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone, img_uri], (err, data, fields) => {
  if (err)  {
    console.log(err)
    return res.status(400).json({status: "error", error: err})
  }

  return res.status(200).json({status: "success", data: "asset created"})
  })
 }


 const updateAsset = (req, res) => {
  if (!req.body)  return res.status(400).json({status: "error", error: "no request body found"})

  let { id,
      name, 
      brand, 
      spec, 
      quantity, 
      price, 
      delivery_cost = 0, 
      delivery_date, 
      vendor, 
      website = '', 
      address = '', 
      contact = '', 
      phone = '',
      img_uri = '' } = req.body

  if (req.files !== null ) {
    const assetImg  = req.files.assetImg
    const assetImgNewPath = `${__dirname}/../public/images/${assetImg.name}`
    img_uri = `${STATIC_IMG_DIR}/${assetImg.name}`

    assetImg.mv(assetImgNewPath, (err) => {
      if (err)  return res.status(500).json({status: "error", error: err.message})
    })
  }
  
  let query = `UPDATE asset SET name=?, brand=?, spec=?, quantity=?, price=?, delivery_cost=?, delivery_date=?, vendor=?, website=?, address=?, contact=?, phone=?, img_uri=? WHERE id=?`
  db.query(query, [name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone, img_uri, id], (err, data, fields) => {
  if (err)  {
    console.log(err)
    return res.status(400).json({status: "error", error: err})
  }

  return res.status(200).json({status: "success", data: "asset created"})
  })
}

const deleteAsset = (req, res) => {
  let id = req.params.id
  console.log('request to delete', id)
  let query = `DELETE FROM asset WHERE id=?`

  db.query(query, [id], (err, data, fields) => {
   if (err)  return res.status(400).json({status: "error", error: err})

   if (data.affectedRows == 0)  return res.status(400).json({status: "error", error: "record not found"})
   return res.status(200).json({status: "success", data: "delete success"})
  })
}

 module.exports = {
  findAssetById,
  getAllAsset,
  createAsset,
  updateAsset,
  deleteAsset
 }