import './Login.scss';
import { Link,  useNavigate } from 'react-router-dom';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager';
import { useState } from 'react';


function Login() {

   const [email , setEmail] = useState('') ; 
   const [password , setPassword] = useState('') ; 
   const navigate = useNavigate() ; 

 async function handleSubmit(e) {
      e.preventDefault() ;
      try {
          const result = await axiosClient.post('/api/auth/login' , {
              email,
              password
          }) ; 
         setItem(KEY_ACCESS_TOKEN , result.result.accessToken) ;
        // console.log("acees to "  , result.result.accessToken) ; 
        // console.log(result) ;        
         navigate('/') ;      
      } catch (e) {
          alert("unauthorized entry") ; 
         // console.log(e);
      }   
  }
  return (
    <div className='Login'>
            <div className='loginBox'>
                <h2 className='heading'>Login</h2>
                <form  onSubmit={handleSubmit} >
                    <label htmlFor='email'>email</label>
                    <input type='email'
                         id='email'
                         required
                         onChange={(e) => {setEmail(e.target.value)}} />
                    <label htmlFor='password'>password</label>
                    <input type='password'
                          id='password'
                          required
                          onChange={(e) => {setPassword(e.target.value)}} />
                    <input type='submit' className='submit' />
                </form>

                <p className='subHeading'>do not have an account ? <Link to='/signup'>signup</Link> </p>

            </div>

        </div>
  )
}

export default Login