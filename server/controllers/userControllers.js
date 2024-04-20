const Post = require('../models/Post');
const User = require('../models/User') ; 
const {error , success} = require ('../utils/responseWrapper') ; 

const followUserController = async (req , res) => {
    try {
        const {userToFollowId} = req.body ; 
        const ownerId = req._id  ; 
        
        const currUser  = await User.findById(ownerId) ;
        const userToFollow = await User.findById(userToFollowId)  ; 
        if(!userToFollow) {
            return res.send(error(404 , "user is not found")) ; 
        }
        // if curr user and user to follow are same then we cant follow ourself
        if(userToFollowId===ownerId) {
           return  res.send(error(409 , "you can not follow yourself")) ; 
        }
        // check curr user already followed this guy , it yes then unfollow this 
        if(currUser.followings.includes(userToFollowId)) {
            // unfollow this user 
            const index = currUser.followings.indexOf(userToFollowId) ;
            currUser.followings.splice(index , 1) ; 
            await currUser.save() ;
            // also remove from followers of userTofollow 

            const i =  userToFollow.followers.indexOf(ownerId) ; 
            userToFollow.followers.splice(i , 1) ; 
            await userToFollow.save() ;  
            return res.send(success(200 , "unfollowed successfully")) ; 
        }
        else {
            // curr user still not followed this guy , so follow it 
            currUser.followings.push(userToFollowId) ; 
            await currUser.save() ; 
            // also add curr user to followers of user to folloe 
            userToFollow.followers.push(ownerId) ; 
            await userToFollow.save() ; 
            return res.send(success(200 , "followed successfully")) ; 
        }

    } catch (e) {
        return res.send(error(500 , e.message)) ; 
    }
}

const getPostOfFollowingController = async (req , res) => {
    try {
        const ownerId = req._id ; 
        const currUser = await User.findById(ownerId) ; 
        const followings = currUser.followings ; 
    
        const posts = await Post.find({
            'owner' : {
                '$in' : followings 
            }
        }) ; 
        return res.send(success(200 , {posts})) ;
        
    } catch (e) {
        res.send(error(500 ,e.message)) ; 
    } 


}

const getUserDataController = async (req,res) => {
    try {
        const ownerId = req._id ; 
        const user  = await User.findById(ownerId)  ; 
        if(!user) {
            return res.send(error(404 , "user not found")) ; 
        }else {
            return res.send(success(200 , {user})) ; 
        }
    } catch (e) {
        return res.send(error(500 , e.message)) ; 
    }
}

module.exports  = {
    followUserController , 
    getUserDataController,
    getPostOfFollowingController
}