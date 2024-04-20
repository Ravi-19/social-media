
import { Route , Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Signup from './pages/singup/Signup';
import Home from './pages/home/Home';
import RequireUser from './components/RequireUser';

function App() {


  return (
    <>
     <div className="container"> 
     <Routes>
        <Route element={<RequireUser />}>
            <Route path='/' element={<Home />}>
            {/* <Route path="/" element={<Feed />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} /> */}
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
     </div>
    </>
  )
}

export default App
