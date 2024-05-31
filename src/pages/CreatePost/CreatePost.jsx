import styles from './CreatePost.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { userInsertDocument } from '../../hooks/userInsertDocument';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const { user } = useAuthValue();

    const navigate = useNavigate();

    const { insertDocument, error, loading } = userInsertDocument("posts");

    const handlerSubmit = async (e) => {
        e.preventDefault();

        try {
            new URL(image)
        } catch (error) {
            setFormError(`A imagem precisa ser uma URL válida`)
        }

        if (!title || !image || !body || !tags) {
            setFormError("Por favor, preencha com atenção todos os campos!")
        }

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        const obj = {
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createBy: user.displayName
        }

        if (formError) return

        try {
            const docCreated = insertDocument(obj)
            if (docCreated) {
                navigate('/')
            }
        } catch (error) {
            setFormError(error)
        }
    };

    useEffect(() => {
        if (error) {
            setFormError(error)
        }
    }, [error])
    return (
        <>
            <div className={styles.create_post}>
                <h2>Nova Postagem</h2>
                <p>Compartilhe sua experiência no mundo desenvolvedor.</p>

                <form onSubmit={handlerSubmit}>
                    <label>
                        <span>Titulo:</span>
                        <input
                            type="text"
                            name='title'
                            id='title'
                            placeholder='Título da postagem'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required />
                    </label>

                    <label>
                        <span>URL da imagem:</span>
                        <input
                            type="text"
                            name='image'
                            id='image'
                            placeholder='Endereço da imagem'
                            onChange={(e) => setImage(e.target.value)}
                            value={image}
                            required />
                    </label>

                    <label>
                        <span>Conteúdo da postagem:</span>
                        <textarea
                            name='body'
                            id='body'
                            placeholder='Insira o conteudo da sua postagem aqui'
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                            required >
                        </textarea>
                    </label>

                    <label>
                        <span>Tags:</span>
                        <input
                            type="text"
                            name='tags'
                            id='tags'
                            placeholder='Insira suas tags separados por virgulas'
                            onChange={(e) => setTags(e.target.value)}
                            value={tags}
                            required />
                    </label>

                    <button className='btn' disabled={loading}>{!loading ? 'Criar Postagem' : 'Postando...'}</button>
                    {formError || error && <p className='error'>{formError || error}</p>}
                </form>
            </div>
        </>
    )
}

export default CreatePost