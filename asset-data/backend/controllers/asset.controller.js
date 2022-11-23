const db = require('../services/db')

const STATIC_IMG_DIR=_DIR = process.env.STATIC_IMG_DIR || 'http://localhost:8000/images'

const moveImg = async (assetImg) => {
  const assetImgNewPath = `${__dirname}/../public/images/${assetImg.name}`
  const res = await assetImg.mv(assetImgNewPath).catch(err => err)

  return {img_uri: `${STATIC_IMG_DIR}/${assetImg.name}`, error: res} 
}


const getAllAsset = async (req, res) => {
  const [rows] = await db.query("select * from asset")
  return res.status(200).json({status: "success", data: rows});
}

const findAssetById = async (req, res) => {
  let query =`Select * from asset where id = ?`

  const [rows, _] = await db.query(query, [req.params.id])
  if (rows.length == 0) return res.status(400).json({status: "error", error: "record not found"})

  return res.status(200).json({ status: "success", data: rows });
 }

const createAsset = async (req, res) => {
  if (!req.body)  return res.status(400).json({status: "error", error: "no request body found"})

  let { id,name,brand,spec,quantity,price,delivery_cost,delivery_date,vendor,website,address,contact,phone,img_uri } = req.body
  if (typeof req.file !== 'undefined' && req.file) {
    img_uri = `${STATIC_IMG_DIR}/${req.file.filename}`
  }

  let query = `insert into asset (name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone, img_uri) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  const [result] = await db.query(query, [name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone, img_uri])
                            .catch(err => [{status: "error", error: err.message}])

  if (result.error) return res.status(400).json({status: "error", error: result.error})
  
  return res.status(200).json({status: "success", data: `data with ID: ${result.insertId} was created`})
 }


 const updateAsset = async (req, res) => {
  if (!req.body)  return res.status(400).json({status: "error", error: "no request body found"})

  console.log("dobyd", req.body)
  let { id,name,brand,spec,quantity,price,delivery_cost,delivery_date,vendor,website,address,contact,phone,img_uri } = req.body
  
  console.log('Req.file', req.file)
  if (typeof req.file !== 'undefined' && req.file) {
    img_uri = `${STATIC_IMG_DIR}/${req.file.filename}`
  }

  const query = `UPDATE asset SET name=?, brand=?, spec=?, quantity=?, price=?, delivery_cost=?, delivery_date=?, vendor=?, website=?, address=?, contact=?, phone=?, img_uri=? WHERE id=?`
  const [result] = await db.query(query, [name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone, img_uri, id])
                            .catch(err => [{status: "error", error: err.message}])

  
  if (result.error) {
    console.log(result.error)
    return res.status(400).json({status: "error", error: result.error})
  }
  return res.status(200).json({status: "success", data: `data with ID: ${id} was updated`})
}

const deleteAsset = async (req, res) => {
  let query = `DELETE FROM asset WHERE id=?`

  const [ result ] = await db.query(query, [req.params.id])
  if (result.affectedRows == 0)  return res.status(400).json({status: "error", error: "record not found"})

  return res.status(200).json({status: "success", data: `data with ID ${req.params.id} was deleted`})
}

 module.exports = {
  findAssetById,
  getAllAsset,
  createAsset,
  updateAsset,
  deleteAsset
 }