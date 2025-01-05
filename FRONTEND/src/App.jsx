import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import Userlogin from './pages/Userlogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
const hello = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        {/* route for user  */}
        <Route path='/login' element={<Userlogin />} />
        <Route path='/signup' element={<UserSignup />} />

        {/* route for captain */}
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />

        {/* route for Userhome wrap in protect wrapper*/}
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />

        {/* route for user logout */}
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />

        {/* route for captain home */}
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />

        {/* route for captain logout */}
        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
      </Routes>
    </div>
  )
}

export default hello