import './Signup.scss'
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className='Signup'>
    <div className='signupBox'>
        <h2 className='heading'>Login</h2>
        <form /* onSubmit={handleSubmit} */>
        <label htmlFor='name'>Name</label>
            <input type='text' id='name' required
            placeholder='Enter your name' /* onChange={(e) => {setName(e.target.value)}}*/ />

            <label htmlFor='email'>email</label>
            <input type='email' id='email' required
            placeholder='Enter your email id ' /*onChange={(e) => {setEmail(e.target.value)}}*/ />

            <label htmlFor='password'>password</label>
            <input type='password' id='password' required
            placeholder='Enter your  password' /* onChange={(e) => {setPassword(e.target.value)}}*/ />

            <input type='submit' className='submit' />
        </form>

        <p className='subHeading'>Already have an account ? <Link to='/login'>Log In</Link> </p>

    </div>

</div>
  )
}

export default Signup