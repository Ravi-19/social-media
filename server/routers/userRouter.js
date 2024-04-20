const router = require('express').Router() ; 
const RequireUser  = require('../middlewares/requireUser') ; 

const userControllers = require ('../controllers/userControllers') ; 


router.post('/follow' , RequireUser ,userControllers.followUserController ) ;
router.post('/' , RequireUser ,userControllers.getUserDataController ) ;
router.get('/getPostsOfFollwings', RequireUser ,userControllers.getPostOfFollowingController) ;

module.exports = router ; 
