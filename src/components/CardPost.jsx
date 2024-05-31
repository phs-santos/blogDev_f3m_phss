import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardPost.module.css';

const CardPost = ({ title, image, createBy, tags, onOpen }) => {
    return (
        <div className={styles.post_detail}>
            <img src={image} alt="image" />
            <h2>{title}</h2>
            <p className={styles.createdby}>por: {createBy}</p>
            <div className={styles.tags}>
                {tags && tags.map((tag, ind) => <p key={ind}>
                    <span>#</span>
                    {tag}
                </p>
                )}
            </div>

            <button className='btn btn-outline' onClick={onOpen}>Ler</button>
        </div>
    )
};

CardPost.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    createBy: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    onOpen: PropTypes.func.isRequired
};

export default CardPost;