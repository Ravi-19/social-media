const router  = require('express').Router(); 
const  postController = require('../controllers/postController') ; 
const requireUser = require('../middlewares/requireUser') ; 


router.get('/' ,requireUser , postController.getAllPostController ) ; 

module.exports = router ; 