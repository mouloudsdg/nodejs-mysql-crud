const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'mld',
  password: '',
  database: 'node_crud',
  port: 3306
})

connection.connect()

module.exports = connection