import './Profile.scss'
import Post from '../post/Post' ; 
import userImg from '../../assets/user.png'
import { useNavigate, useParams } from 'react-router-dom';
import CreatePost from '../createPost/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../redux/slices/postsSlice';

function Profile() {
  const navigate = useNavigate() ; 
  const params = useParams() ; 
  const dispatch = useDispatch() ; 
  const userId = params.id ; 
  const userProfile = useSelector(state => state.postReducer.userProfile) ; 
  const myProfile = useSelector(state => state.appConfigReducer.myProfile) ; 
  const [isMyProfile , setIsMyProfile] = useState(false) ; 
  
  
  useEffect(()=>{
    dispatch(getUserProfile({userId})) ; 
    setIsMyProfile(userId === myProfile?.user?._id) ; 
   // console.log("my profile " , myProfile?.user?._id) ; 
   // console.log("user id ",userId) ; 
  ///  console.log(userProfile); 
  },[]) ;
  return (
    <div className='Profile'>
      <div className='container'>
        <div className='leftPart'>
          <CreatePost/>
         {
          userProfile?.posts?.map(post => {
           return  <Post key={post._id} post={post}/>
          })
         }

        </div>
        <div className='rightPart'>
          <div className='profileCard'>
            <img className='userImg' src={myProfile?.user?.avatar?.url} alt='user img'/>
            <h3 className='userName'>{userProfile?.name}</h3>
            <div className='followerInfo'>
              <h4>{userProfile?.followers?.length} Followers</h4>
              <h4>{userProfile.followings?.length} following</h4>
            </div>
            {!isMyProfile && <button className='follow btn-primary' >Follow</button>}
            {isMyProfile && (<button className='updateProfile btn-secondary' onClick={()=>{
              navigate('/updateProfile')
            }}>Update Profile</button>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile