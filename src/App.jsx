import './App.css'
import { BrowserRouter, Routes, Route, Navigate, Form } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { userAuthentication } from './hooks/userAuthentication'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'
import RecoveryPassword from './pages/RecoveryPassword/RecoveryPassword'
import NotFound from './pages/NotFound/NotFound'

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = userAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <div className='container load'>
      <svg style={{ left: "50%", top: "50%", position: "absolute", transform: "translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)" }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 187.3 93.7" height="300px" width="400px">
        <path d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" strokeMiterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" fill="none" id="outline" stroke="#4E4FEB"></path>
        <path d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" strokeMiterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" stroke="#4E4FEB" fill="none" opacity="0.05" id="outline-bg"></path>
      </svg>
    </div>
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar value={user} />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/recovery-password' element={<RecoveryPassword />}></Route>
              <Route path='/post/create' element={<CreatePost />}></Route>
              <Route path='/dashboard' element={<Dashboard />}></Route>
              <Route path='*' element={<NotFound />}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App