const router  = require('express').Router(); 
const  postControllers = require('../controllers/postControllers') ; 
const requireUser = require('../middlewares/requireUser') ; 


router.get('/all' ,requireUser , postControllers.getAllPostController ) ;  
router.post('/' , requireUser , postControllers.createPostController) ; 
router.post('/like' , requireUser , postControllers.likeAndUnlikePostController); 

module.exports = router ; 