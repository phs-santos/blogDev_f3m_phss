import { BrowserRouter, Routes, Route, Navigate, Form } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { userAuthentication } from './hooks/userAuthentication'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { About, CreatePost, Dashboard, EditPost, Home, Login, Post, Register } from './pages';

import loadingGif from './assets/loading.gif'

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
			<img src={loadingGif} alt="loader" />
		</div>
	}

	return (
		<>
			<AuthProvider value={{ user }}>
				<BrowserRouter>
					<Navbar value={user} />
					
					<main className='container'>
						<Routes>
							<Route path='/' element={<Home />}></Route>
							<Route path='/about' element={<About />}></Route>
							<Route path='/register' element={<Register />}></Route>
							<Route path='/login' element={<Login />}></Route>
							<Route path='/post/create' element={<CreatePost />}></Route>
							<Route path='/dashboard' element={<Dashboard />}></Route>
							<Route path='/posts/:id' element={<Post />}></Route>
							<Route path='/posts/edit/:id' element={<EditPost />}></Route>
						</Routes>
					</main>
				</BrowserRouter>
			</AuthProvider>
		</>
	)
}

export default App