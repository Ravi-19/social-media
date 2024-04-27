import './Feed.scss'
import Post from '../post/Post';
import Follower from '../follower/Follower';

function Feed() {
  return (
    <div className='Feed'>
      <div className='container'>
        <div className='leftPart'>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
        <div className='rightPart'>
          <div className='follwings'>
            <h3 className='title'>You are follwings</h3>  
            <Follower/>
            <Follower/>
            <Follower/>
            <Follower/>
            <Follower/>
            
          </div>

          <div className='suggestions'>
            <h3 className='title'>Suggestions four you</h3>
            <Follower/>
            <Follower/>
            <Follower/>
            <Follower/>
            <Follower/>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Feed ; 