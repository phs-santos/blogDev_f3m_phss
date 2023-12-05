import { useState, useEffect } from 'react'
import { db } from '../firebase/config'

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
	sendPasswordResetEmail
} from 'firebase/auth'

const provider = new GoogleAuthProvider();

export const userAuthentication = () => {
	const [authError, setAuthError] = useState(null)
	const [loading, setLoading] = useState(null)

	const auth = getAuth()

	async function createUser(data, navigate) {
		setLoading(true)
		setAuthError(null)

		try {
			const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)

			await updateProfile(user, {
				displayName: data.displayName
			})

			setLoading(false)

			return user
		} catch (error) {
			let systemErrorMessage;
			switch (error.code) {
				case 'auth/email-already-in-use':
					systemErrorMessage = <span>E-mail já cadastrado. <a style={{cursor: 'pointer'}} onClick={() => navigate('/login')}>Faça Login</a></span>;
					break;
				case 'auth/operation-not-allowed':
					systemErrorMessage = 'Operação não permitida';
					break;
				case 'auth/weak-password':
					systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres';
					break;
				default:
					systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde';
			}
			console.log(systemErrorMessage)

			setLoading(false)
			setAuthError(systemErrorMessage)
		}
	}

	const login = async (data, navigate) => {
		setLoading(true)
		setAuthError(null)

		try {
			await signInWithEmailAndPassword(auth, data.email, data.password)
			setLoading(false)
		} catch (error) {
			let systemErrorMessage;

			switch (error.code) {
				case 'auth/invalid-login-credentials':
					systemErrorMessage = <span>Há erros com suas credenciais. <a style={{cursor: 'pointer'}} onClick={() => navigate('/register')}>Cadastre-se</a></span>;
					break;
				case 'auth/user-disabled':
					systemErrorMessage = 'O usuário com este e-mail foi desabilitado';
					break;
				default:
					systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde';
			}

			setLoading(false)
			setAuthError(systemErrorMessage)
		}

	}

	const login_with_google = async () => {
		setLoading(true)
		setAuthError(null)

		await signInWithPopup(auth, provider).then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result)
			const token = credential.accessToken
			const user = result.user
			console.log(user)
			return user
		}).catch((error) => {
			let systemErrorMessage;

			switch (error.code) {
				case 'auth/popup-closed-by-user':
					systemErrorMessage = 'O popup de autenticação foi fechado antes da operação ser concluída.';
					break;
				case 'auth/cancelled-popup-request':
					systemErrorMessage = 'Múltiplas solicitações de popups foram feitas.';
					break;
				case 'auth/operation-not-allowed':
					systemErrorMessage = 'A operação não é permitida.';
					break;
				default:
					systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde.';
			}

			setAuthError(systemErrorMessage)
		})
		setLoading(false)
	}

	const logout = async () => {
		setLoading(true)
		setAuthError(null)

		try {
			await signOut(auth)
		} catch (error) {
			let systemErrorMessage;

			switch (error.code) {
				case 'auth/no-current-user':
					systemErrorMessage = 'Nenhum usuário está atualmente logado.';
					break;
				default:
					systemErrorMessage = 'Ocorreu um erro ao tentar sair, tente novamente mais tarde.';
			}

			setAuthError(systemErrorMessage)
		}

		setLoading(false)
	}

	const reset_password = async (email) => {
		setLoading(true)
		setAuthError(null)

		try {
			const data = await sendPasswordResetEmail(auth, email)

			setLoading(false)
			return 'Email de redefineção de senha enviado com sucesso';
		} catch (error) {
			let systemErrorMessage;

			switch (error.code) {
				case 'auth/invalid-email':
					systemErrorMessage = 'O e-mail fornecido não é válido';
					break;
				case 'auth/user-not-found':
					systemErrorMessage = 'Não há usuário correspondente ao e-mail fornecido';
					break;
				default:
					systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde';
			}

			setLoading(false)
			setAuthError(systemErrorMessage)
		}
	}

	return {
		auth,
		createUser,
		login,
		login_with_google,
		logout,
		reset_password,
		authError,
		loading
	}
}