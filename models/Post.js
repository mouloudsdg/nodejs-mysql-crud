const connection = require("../config/db")
const moment = require("../config/moment")



moment.locale('fr')

class Post {

  constructor (row) {
    this.row = row
  }

  get id () {
    return this.row.id
  }

  get content () {
    return this.row.content
  }

  get created_at () {
    return moment(this.row.created_at)
  }

  static create (content, cb) {
    connection.query("INSERT INTO posts SET content = ?, created_at = ?", [content,new Date()],(err, result) => {
      if (err) throw err
      cb()
    })
  }

  static all (cb) {
    connection.query("SELECT * FROM posts ORDER BY created_at desc",(err, rows) => {
      if (err) throw err
      cb(rows.map((row) => new Post(row))) 
    })
  }

  static find(id, cb) {
    connection.query("SELECT * FROM posts WHERE id = ? LIMIT 1",[id] ,(err, row) => {
      if (err) throw err
      cb(new Post(row[0]))
    })
  }

  static delete(id, cb) {
    connection.query("DELETE FROM posts WHERE id = ?",[id] ,(err, result) => {
      if (err) throw err
      cb()
    })
  }

  static update(id, content, cb) {
    connection.query("UPDATE posts SET content = ?, created_at = ? WHERE id = ?",[content,new Date(), id],(err, result) => {
      if (err) throw err
      cb()
    })
  }
}

module.exports = Post