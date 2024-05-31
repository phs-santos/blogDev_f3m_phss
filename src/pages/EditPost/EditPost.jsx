import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { userFetchDocument } from '../../hooks/userFetchDocument';
import { userUpdateDocument } from '../../hooks/userUpdateDocument';
import { useNavigate } from 'react-router-dom'
import styles from './EditPost.module.css';
import loadingGif from '../../assets/loading.gif';

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const { document, error, loading } = userFetchDocument('posts', id);
  const { updateDocument } = userUpdateDocument('posts', id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image || !body || !tags) {
      setFormError('Preencha todos os campos');
      return;
    }

    const newData = {
      title,
      image,
      body,
      tags
    }

    try {
      setFormError(null);
      await updateDocument(newData);
      alert('Post atualizado com sucesso!');
      navigate('/dashboard')
    } catch (error) {
      console.error(error);
      setFormError(error.message);
    }
  }

  useEffect(() => {
    if (document) {
      setTitle(document.title);
      setImage(document.image);
      setBody(document.body);
      setTags(document.tags);
    }
  }, [document]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <img src={loadingGif} alt="Loading" />
      </div>
    );
  }

  return (
    <div className={styles.create_post}>

      <form onSubmit={handleSubmit}>
        <h2>Editando post: {document?.title}</h2>
        <p style={{ marginBottom: '2em' }}>Altere os dados do post como desejar</p>
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

        <p>Preview da imagem atual:</p>
        <img src={document?.image} alt="preview da imagem" style={{ maxWidth: '700px', margin: '0 auto', display: 'block' }} />

        <label>
          <span>Conteúdo:</span>
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
            placeholder='Insira suas tags separadas por vírgulas'
            onChange={(e) => setTags(e.target.value.split(','))}
            value={tags.join(',')}
            required />
        </label>

        <button className='btn' disabled={loading}>{!loading ? 'Editar' : 'Atualizar...'}</button>
        {formError || error && <p className='error'>{formError || error}</p>}
      </form>
    </div>
  );

}