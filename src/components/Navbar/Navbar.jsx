import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { userAuthentication } from '../../hooks/userAuthentication'
import { useAuthValue } from '../../context/AuthContext'

import styles from './Navbar.module.css'

const Navbar = () => {
  const [statusEmail, setStatusEmail] = useState(null)
  const { user } = useAuthValue()

  const { loading, logout, send_email_verification } = userAuthentication()

  const navigate = useNavigate()

  const handlerLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handlerSendEmailVerification = async () => {
    await send_email_verification();
    const text = 'E-mail de verificação enviado, verifique sua caixa de entrada';
    setStatusEmail(
      <div className={styles.status_email}>
        {text.split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${index / 10}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>);
  };

  useEffect(() => {
    if (user && !user.emailVerified) {
      setStatusEmail(<span className={styles.status_email}>E-mail não verificado, <a onClick={() => handlerSendEmailVerification()}>clique aqui para verificar</a></span>)
    } else {
      setStatusEmail(null)
    }
  }, [user])

  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
          Blog <span>Dev</span></NavLink>
        {statusEmail}
        <ul className={styles.links_list}>
          <li>
            <NavLink to='/'
              className={({ isActive }) => (isActive ? styles.active : null)}>Home</NavLink>
          </li>

          {!user && (
            <>
              <li>
                <NavLink to='/login'
                  className={({ isActive }) => (isActive ? styles.active : null)}>Login</NavLink>
              </li>
              <li>
                <NavLink to='/register'
                  className={({ isActive }) => (isActive ? styles.active : null)}>Register</NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <NavLink to='/post/create'
                  className={({ isActive }) => (isActive ? styles.active : null)}>New Post</NavLink>
              </li>

              <li>
                <NavLink to='/dashboard'
                  className={({ isActive }) => (isActive ? styles.active : null)}>Dashboard</NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink to='/about'
              className={({ isActive }) => (isActive ? styles.active : null)}>About</NavLink>
          </li>

          {user && (
            <li>
              <button className={styles.logout} onClick={() => handlerLogout()}>Exit</button>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar