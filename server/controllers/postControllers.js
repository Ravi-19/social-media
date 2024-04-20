const Post = require("../models/Post");
const User = require("../models/User") ; 
const {success  , error} = require("../utils/responseWrapper") ; 

const getAllPostController = async(req , res) =>{
   // res.send("here is your all post ") ; 
   try {
    const owner = req._id ; 
    const user =await User.findById(owner) ; 
    
    let postIdArr = user.posts ;
    if(postIdArr.length <=0) {
        return res.send(error(404 , "this user have not any post")) ; 
    }
   // console.log("befone map " ,  allPosts) ; 
    // allPosts.map(async(item) => {
    //     console.log("item " , item) ; 
    //      let currPost  = await Post.findById(item) ;
    //     console.log("currPost " , currPost ) ;  
    //      return currPost ; 
    // })
    const allPosts  = await fetchPost(postIdArr) ; 
  //  console.log("after map " , allPosts) ; 

    res.send(success(200 , {allPosts}))  ; 
   } catch (e) {
        res.send(error(500 , e.message)) ; 
   }
}

const createPostController = async (req , res) => {
  
    try {
        const {caption} = req.body ; 
        const owner= req._id ;
        const  user =await User.findById(owner) ;
        //caption must be send by user
        if(!caption) {
            return res.send(error(500 , "caption is required")) ; 
        }
        // create post in post collection 
        const post =await  Post.create({
            owner , 
            caption 
        }) ; 
       // save id of post int to  its owner's collection 
        user.posts.push(post._id) ; 
        await user.save() ; 
       // send post data to the frontend 
        return res.send(success(201 , post)) ;  
    } catch (e) {
        // if error occur 
        return res.send(error(500 , e.message)) ; 
    }
}

const likeAndUnlikePostController = async (req , res) => {
    try {
        const {postId} = req.body ; 
        const currUser = req._id ; 
        const post = await Post.findById(postId) ; 
        // if post id is not present 
        if(!post) {
            return res.send(error(500 , "post not found")) ; 
        }

        // if user already liked post then do unlike 
        if(post.likes.includes(currUser)) {
            // remove it from like arr 
            const index = post.likes.indexOf(currUser) ; 
            post.likes.splice(index , 1 ) ; 
            await post.save() ; 
            return res.send(success(200 , "post unliked"))  ; 
        }
        else {
            /// curr user has not liked the post so like it 
            console.log("curr user " , currUser) ; 
            post.likes.push(currUser) ; 
            await post.save() ; 
            return res.send(success(200 , "post liked")) ; 

        }
    } catch (e) {
        return res.send(error(500 , e.message)) ; 
    }
}

// internal function 
const fetchPost = async (postIdArr) => {
        let ans =[]; 
        for(let i = 0 ; i < postIdArr.length ; i++) {
            const post = await Post.findById(postIdArr[i]) ; 
            ans.push(post) ; 
        }
        return ans ; 
}

module.exports = {
    getAllPostController , 
    createPostController , 
    likeAndUnlikePostController
}