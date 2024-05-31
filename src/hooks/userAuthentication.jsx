import { useState, useEffect } from 'react';

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	signInWithPopup,
	GoogleAuthProvider
} from 'firebase/auth';

const provider = new GoogleAuthProvider();

export const userAuthentication = () => {
	const [authError, setAuthError] = useState(null)
	const [loading, setLoading] = useState(null)

	const auth = getAuth()

	async function createUser(data) {
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
					systemErrorMessage = 'E-mail já cadastrado';
					break;
				case 'auth/invalid-email':
					systemErrorMessage = 'O e-mail fornecido não é válido';
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

			setLoading(false)
			setAuthError(systemErrorMessage)
		}
	}

	const login = async (data) => {
		setLoading(true);
		setAuthError(null);

		try {

			const userLogin = await signInWithEmailAndPassword(auth, data.email, data.password);
			setLoading(false);
			return userLogin;
		} catch (error) {
			let systemErrorMessage;

			switch (error.code) {
				case 'auth/invalid-login-credentials':
					systemErrorMessage = `Há erros com suas credenciais`;
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

	const logout = () => {
		signOut(auth)
	}

	return {
		auth,
		createUser,
		login, 
		login_with_google,
		logout,
		authError,
		loading
	}
}