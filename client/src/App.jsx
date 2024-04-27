
import { Route , Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Signup from './pages/singup/Signup';
import Home from './pages/home/Home';
import RequireUser from './components/RequireUser';
import LoadingBar from 'react-top-loading-bar' ;
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Feed from './components/feed/Feed';
import Profile from './components/profile/Profile';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import AlreadyLoggedIn from './components/AlreadyLoggedIn';

function App() {
  const loadingRef = useRef(null);
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);


  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);
  


  return (
    <>
     <div className="App"> 
      <LoadingBar height={8} color="black" ref={loadingRef} />
      <Routes>
        <Route element={<RequireUser />}>
            <Route  element={<Home />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/updateProfile" element={<UpdateProfile />} />
            </Route>
        </Route>
        <Route element={<AlreadyLoggedIn/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
     </div>
    </>
  )
}

export default App
