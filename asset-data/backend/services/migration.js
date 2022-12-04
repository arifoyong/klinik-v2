const db = require('../services/db')

const migrateUser = async (req, res) => {
  const createUserTable = `CREATE TABLE user (
                                  email varchar(50) NOT NULL,
                                  password varchar(50) NOT NULL,
                                  PRIMARY KEY (email)
                                )`

  let result = await db.query(createUserTable).catch((err) => {
    console.log(err.message)
  })
}

const migrateAsset = async (req, res) => {
  const createUserTable = `CREATE TABLE asset (
                                        id int(10) NOT NULL AUTO_INCREMENT,
                                        name varchar(50) NOT NULL,
                                        brand varchar(50) NOT NULL,
                                        spec varchar(50) NOT NULL,
                                        quantity int(10) NOT NULL,
                                        price float NOT NULL,
                                        delivery_cost float,
                                        delivery_date date,
                                        vendor varchar(50),
                                        website varchar(50),
                                        address varchar(200),
                                        contact varchar(50),
                                        phone varchar(20),
                                        img_uri varchar(500),
                                        PRIMARY KEY (id)
                                      )`

  let result = await db.query(createUserTable).catch((err) => {
    console.log(err.message)
  })
}


module.exports = { migrateUser, migrateAsset }


