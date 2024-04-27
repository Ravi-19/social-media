import { useDispatch } from 'react-redux';
import Avatar from './../avatar/Avatar';
import './Post.scss'  ;
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { likeAndUnlike } from '../../redux/slices/postsSlice';
function Post({post}) {
 // console.log(post)  ; 
  const dispatch = useDispatch() ; 
  async function onLikeHandle () {
    dispatch(likeAndUnlike({postId:post._id})) ; 
   // console.log("liked cliked") ; 
  }
  return (
    <div className='Post'>
        <div className='heading'>
            <Avatar src={post?.owner?.avatar?.url}/>
            <h4>{post?.owner?.name}</h4>
        </div>
        <div className='contant'>

            <img src={post?.image?.url} alt='post'/>
        </div>
        <div className='footer'>
            <div className='like hover-link' onClick={onLikeHandle}>
                {post?.isLiked ? <AiFillHeart className='icon hover-link' style={{color:'red'}}/>: <AiOutlineHeart className='icon hover-link'/>}
            <h4>{`${post?.likeCount} likes`}</h4>
            </div>
            <p className='caption'>  {post?.caption} </p>
            <h6 className='timeAgo'> 14 hours ago </h6>
        </div>

    </div>
  )
}

export default Post