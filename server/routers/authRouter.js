const router = require('express').Router() ; 
const authControllers = require('../controllers/authControllers') ; 

router.post('/signup', authControllers.signupController) ; 
router.post('/login', authControllers.loginController) ; 
router.get('/refresh', authControllers.refreshTokenController);


module.exports = router ; 
