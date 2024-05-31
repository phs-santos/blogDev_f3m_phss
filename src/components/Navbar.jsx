import { NavLink, useNavigate } from 'react-router-dom'
import { userAuthentication } from '../hooks/userAuthentication'
import { useAuthValue } from '../context/AuthContext'

import styles from './Navbar.module.css'

const Navbar = () => {
	const { user } = useAuthValue()
	const { logout } = userAuthentication()

	const navigate = useNavigate()

	return (
		<header>
			<nav className={styles.container__nav}>
				<NavLink to="/" >
					Blog <span>Dev</span> <code>{user && user.displayName && ` - ${user.displayName}`}</code>
				</NavLink>

				<ul className={styles.container__ul}>
					<li>
						<NavLink to='/'>Home</NavLink>
					</li>

					{!user && (
						<>
							<li>
								<NavLink to='/login'>Login</NavLink>
							</li>
							<li>
								<NavLink to='/register'>Register</NavLink>
							</li>
						</>
					)}

					{user && (
						<>
							<li>
								<NavLink to='/post/create'>New Post</NavLink>
							</li>

							<li>
								<NavLink to='/dashboard'>Dashboard</NavLink>
							</li>
						</>
					)}

					<li>
						<NavLink to='/about'>About</NavLink>
					</li>

					{user && (
						<li>
							<button onClick={() => { 
								logout()
								navigate('/')
							}}>Exit</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default Navbar