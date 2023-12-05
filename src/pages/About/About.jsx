import styles from './About.module.css';
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
      <div className={styles.about}>
        <h2>Sobre o Blog <span>DEV</span></h2>

        <p>Este projeto consiste em um escopo de blog feito com tecnologia React no front-end e Firebase no back-end</p>

        <Link to='/post/create' className={styles.btn}>Criar post</Link>
      </div>
    </>
  )
}

export default About