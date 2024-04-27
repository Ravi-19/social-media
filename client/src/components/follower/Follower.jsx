import './Follower.scss'
import Avatar from './../avatar/Avatar';


function Follower() {
  return (
    <div className='Follower'>
        <div className='userInfo'>
        <Avatar/>
        <h4 className='name'>robin utthpa</h4>
        </div>
        <h5 className='follow-link hover-link'>follow</h5>
    </div>
  )
}

export default Follower