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

 const createAsset = (req, res) => {
   console.log(req.body)
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