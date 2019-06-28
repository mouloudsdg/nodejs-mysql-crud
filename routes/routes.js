module.exports = {

  getHomePage: (req, res) => {
    const Post = require('../models/Post')
    Post.all((posts) => {
      res.render('pages/index', {posts: posts})
    })
    
  },

  addPost: (req, res) =>{
    if (req.body.post === undefined || req.body.post === '') {
      req.flash('error', "Vous n'avez pas posté de message !")
      res.redirect('/')
    }
    else {
      const Post = require('../models/Post')
      Post.create(req.body.post, () => {
        req.flash('success', "Votre post a bien était envoyer !")
        res.redirect('/')
      })
    }
    
  },

  getPost: (req, res) => {
    const Post = require("../models/Post")
    Post.find(req.params.id, (post) => {
      res.render("pages/post", {post: post})
    })
  },

  delPost: (req, res) => {
    const Post = require("../models/Post")
    Post.delete(req.params.id, () => {
      req.flash('success','Votre Post a bien était supprimer')
      res.redirect('/')
    })
  },

  upPost: (req, res) => {
    if (req.body.post === undefined || req.body.post === '') {
      req.flash('error', "Vous n'avez pas posté de message !")
      res.redirect('/')
    }
    else {
      const Post = require("../models/Post")
      Post.update(req.params.id, req.body.post, () => {
      req.flash('success','Votre Post a bien était modifier')
      res.redirect('/')
      })
    }
  }

}