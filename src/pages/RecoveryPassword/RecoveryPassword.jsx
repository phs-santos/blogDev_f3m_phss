import { useState, useEffect } from 'react'
import { userAuthentication } from '../../hooks/userAuthentication'
import { useNavigate } from 'react-router-dom'

import styles from './RecoveryPassword.module.css';

const RecoveryPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const { reset_password, loading, authError } = userAuthentication()
    const navigate = useNavigate()

    const handlerSubmit = async (e) => {
        e.preventDefault();

        try {
            const recovery = await reset_password(email);

            if (recovery) {
                setError(recovery);
                setTimeout(() => {
                    navigate('/login')
                }, 1500)
            }
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className={styles.recovery}>
            <h1>Recuperar a senha do BlogDev</h1>
            <p>Digite o seu email para recuperar a senha e voltar a Compartilhar suas ideias!</p>
            <form onSubmit={handlerSubmit} className={styles.form_login}>
                <label>
                    <span>E-mail: </span>
                    <input type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Insira seu e-mail' />
                </label>

                <button className='btn' disabled={loading}>{!loading ? 'Enviar' : 'Aguarde...'}</button>
                {error && <p className='error'>{error}</p>}

            </form>
        </div>
    )
}

export default RecoveryPassword