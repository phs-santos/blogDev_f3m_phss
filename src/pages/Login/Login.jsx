import React, { useState, useEffect } from 'react'
import { userAuthentication } from '../../hooks/userAuthentication';
import { useNavigate } from 'react-router-dom'

import styles from './Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, authError, loading, auth, login_with_google } = userAuthentication()
  const navigate = useNavigate()

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const user = {
      email,
      password
    }

    try {
      const res = await login(user, navigate)
      console.log(res)
      if (res) navigate('/post/create')
    } catch (error) {
      console.log(error)
      setError('Erro ao fazer login, porfavor tente novamente mais tarde')
    }
  };

  const handlerLoginWithGoogle = async (e) => {
    e.preventDefault();
    setError('');

    await login_with_google().then((res) => {
      console.log(res)
      navigate('/post/create')
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.login}>
      <h1>Entrar no BlogDev</h1>
      <p>Entre no ambiente do BlogDev, e comece a Compartilhar suas ideias!</p>
      <form onSubmit={handlerSubmit} className={styles.form_login}>
        <label>
          <span>E-mail: </span>
          <input type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Entre com seu e-mail' />
        </label>

        <label>
          <span>Senha: </span>
          <input type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Entre com sua senha' />
        </label>

        <a style={{
          alignSelf: 'end',
          textDecoration: 'underline',
          cursor: 'pointer',
          marginBottom: '10px',
          marginTop: '10px'
        }}
        onClick={() => navigate('/recovery-password')}>
          Esqueci minha senha</a>

        <button className='btn' disabled={loading}>{!loading ? 'Login' : 'Aguarde...'}</button>
        {error && <p className='error'>{error}</p>}

        <a className={` btn ${styles.btn} `} onClick={handlerLoginWithGoogle}>
          <svg version="1.1" width="20" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve">
            <path style={{ fill: '#FBBB00' }} d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"></path>
            <path style={{ fill: '#518EF8' }} d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
    c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
    c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"></path>
            <path style={{ fill: '#28B446' }} d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
    c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
    c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"></path>
            <path style={{ fill: '#F14336' }} d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
    c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
    C318.115,0,375.068,22.126,419.404,58.936z"></path>
          </svg>
          Google
        </a>
      </form>
    </div>
  )
}
