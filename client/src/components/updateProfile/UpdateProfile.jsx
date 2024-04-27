import './UpdateProfile.scss' ; 
////import userImg from '../../assets/user.png'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { updateMyProfile } from '../../redux/slices/appConfigSlice';

function UpdateProfile() {
    const myProfile = useSelector(state => state.appConfigReducer.myProfile) ; 
    const [name , setName] = useState("") ; 
    const [bio , setBio] = useState("") ; 
    const [userImg , setImage] = useState('') ; 
    const dispatch = useDispatch() ; 

    useEffect(()=> {
           setName(myProfile?.user?.name || '') ;
           setBio(myProfile?.user?.bio || '') ;
           setImage(myProfile?.user?.avatar?.url || '') ;
    } ,[myProfile])
    
    const handleImgChange = (e) => {
        const file = e.target.files[0] ; 
        const fileReader = new FileReader() ; 

        fileReader.readAsDataURL(file) ; 
        fileReader.onload = () => {
            if(fileReader.readyState === fileReader.DONE) {
              //  console.log("image data " , fileReader.result) ; 
                setImage(fileReader.result) ; 
            }
        }
    }
    const handleSubmit = (e)=> {
        e.preventDefault() ; 
        dispatch(updateMyProfile({
            name , 
            bio , 
            userImg
        }
            
        ))
        
    }
  return (
    <div className='UpdateProfile'>
        <div className='container'>
            <div className='leftPart'>
                {/* <img className='userImg' src={userImg} alt='userImg'/> */}
                <div className="inputUserImg">
                    <label htmlFor="inputImg"  className="labelImg"><img className='userImg' src={userImg? userImg : userImg} alt='userImg'/>
                    </label>
                    <input id='inputImg' className='inputImg' type="file" accept='image/*' onChange={handleImgChange}/>
                </div>
            </div>
            <div className='rightPart'> 
                <form onSubmit={handleSubmit}>
                    <input value={name }  type='text' placeholder='Your Name' onChange={(e)=> setName(e.target.value)}/>
                    <input value={bio } type='text' placeholder='Your bio' onChange={(e)=> setBio(e.target.value)}/>
                    <input type='submit'  className='btn-primary submit'  onClick={handleSubmit}/>
                </form>
                <button className='btn-primary deleteAccount'>Delete Account</button>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfile