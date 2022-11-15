const db = require('../services/db')

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

const createAsset2 = (req, res) => {
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
      phone = '' } = req.body
  let assetImgUri = ''
  const assetImg  = req.files?.assetImg

  if (assetImg !== undefined) {
    const assetImgNewPath = `${__dirname}/../public/images/${assetImg.name}`
    assetImgUri = `http://localhost:5000/images/${assetImg.name}`

    assetImg.mv(assetImgNewPath, (err) => {
      if (err)  return res.status(500).json({status: "error", error: err.message})
    })
  }
  
  let query = `insert into asset (name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone, img_uri) 
  values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  db.query(query, [name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone, assetImgUri], (err, data, fields) => {
  if (err)  {
    return res.status(400).json({status: "error", error: err})
  }

  return res.status(200).json({status: "success", data: "asset created"})
  })
 }

 const createAsset = (req, res) => {
   if (!req.body)  return res.status(400).json({status: "error", error: "no request body found"})

   let { name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone} = req.body
   let query = `insert into asset (name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone) 
      values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

   db.query(query, [name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone], (err, data, fields) => {
    if (err)  return res.status(400).json({status: "error", error: err})

    return res.status(200).json({status: "success", data: "asset created"})
   })
 }

 const updateAsset = (req, res) => {
  if (!req.body)  return res.status(400).json({status: "error", error: "no request body found"})

  let { name, brand, spec, price} = req.body
  let id = req.params.id
  let query = `UPDATE asset SET name=?, brand=?, spec=?, price=? WHERE id=?`

  db.query(query, [name, brand, type, price, id], (err, data, fields) => {
   if (err)  return res.status(400).json({status: "error", error: err})

   if (data.affectedRows == 0)  return res.status(400).json({status: "error", error: "record not found"})
   return res.status(200).json({status: "success", data: "update success"})
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
  createAsset2,
  updateAsset,
  deleteAsset
 }