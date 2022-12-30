const executeQuery = require('../services/dbService')
const { createError, BAD_REQUEST } = require('../services/createError')

const Asset = () => {
  const tableName = "asset"

  const migrate = async () => {
    const query = `CREATE TABLE asset (id INT NOT NULL AUTO_INCREMENT,
                    name VARCHAR(50) NOT NULL, 
                    brand VARCHAR(50) NOT NULL,
                    spec VARCHAR(50) NOT NULL,
                    quantity INT NOT NULL,
                    price FLOAT NOT NULL,
                    delivery_cost FLOAT,
                    delivery_date DATE,
                    vendor VARCHAR(50),
                    website VARCHAR(50),
                    address VARCHAR(200),
                    contact VARCHAR(50),
                    phone VARCHAR(20),
                    img_uri VARCHAR(500),
                    PRIMARY KEY (id)
                    )`
    const result = await executeQuery(query)
    return result
  }

  const findAll = async (limit=3, page=1) => {
    const offset = page > 0 ? limit*(page-1) : 0
    const query = `SELECT * from ${tableName} LIMIT ${limit} OFFSET ${offset}`
    const result = await executeQuery(query)
  
    return result
  }

  const countAsset = async () => {
    const query = `SELECT COUNT (*) as count from ${tableName}`
    const result = await executeQuery(query)

    return result[0].count
  }

  const findOne = async (field, value) => {
    const query = `SELECT * from ${tableName} WHERE ${field} = ?`
    const params = [value]
    const result = await executeQuery(query, params)
  
    return result
  }

  const createAsset = async ({name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone, img_uri }) => {      
    const query = `insert into ${tableName} (name, brand, spec, quantity, price, delivery_cost, delivery_date, 
                                            vendor, website, address, contact, phone, img_uri) 
                              values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const params = [name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone, img_uri]

    try {
      const result = await executeQuery(query, params)
      return result
    } catch (err) {
      throw createError({statusCode:BAD_REQUEST, message:err.message})
    }
  }

  const updateAsset = async ({name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone, img_uri, id }) => {
    const query = `UPDATE ${tableName}  SET name=?, brand=?, spec=?, quantity=?, price=?, delivery_cost=?, delivery_date=?, 
                                            vendor=?, website=?, address=?, contact=?, phone=?, img_uri=? 
                                        WHERE id=?`
    const params = [name, brand, spec, quantity, price, delivery_cost, delivery_date, vendor, website, address, contact, phone, img_uri, id]

    try {
      const result = await executeQuery(query, params)
      return result
    } catch (err) {
      throw createError({statusCode:BAD_REQUEST, message:err.message})
    }
  }

  const deleteAsset = async({id}) => {
    const query = `DELETE FROM ${tableName} WHERE id=?`
    const params = [id]
    try {

      const result = await executeQuery(query, params)
      if (result.affectedRows == 0)  throw createError({statusCode: BAD_REQUEST, message: "Record not available"})

      return result
    } catch (err) {
      throw createError({statusCode:BAD_REQUEST, message:err.message})
    }
  }



  return {
    findAll,
    countAsset,
    createAsset,
    findOne,
    updateAsset,
    deleteAsset
  }
}


module.exports = Asset