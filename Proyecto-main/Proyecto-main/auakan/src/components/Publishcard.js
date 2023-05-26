import { Link } from "react-router-dom";
import styles from "./Publishcard.module.css";



export function Publishcard({ publica }) {
  const imageurl =
    "https://auakanapi.000webhostapp.com/api.php?request=getAnuncios" +
    publica.fotografia_prod;



  return (
    <li className={styles.publishcard}>
      <Link to={`/publicacion/${publica.id}`} state={{ publica }}>
        <img
          width={230}
          height={345}
          className={styles.publishimage}
          src={publica.fotografia_prod}
          alt={publica.nombre_prod}
        />
      </Link>
      <div>{publica.nombre_prod}</div>
    </li>
  );
}
/*import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Publishcard.module.css";
export function Publishcard({ publica }) {
    const imageurl = "https://image.tmdb.org/t/p/w300" + publica.poster_path;
    return (
       <li className={styles.publishcard}>
        <Link to={"/publicacion/" + publica.id}>
        <img
            width={230}
            height={345} 
            className={styles.publishimage}
            src = {imageurl} 
            alt = {publica.title}/>
        </Link>
            
            <div>{publica.nombre_prod}</div>
        </li>
    );
}
/*import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Publishcard.module.css";
export function Publishcard({ publica }) {
    const imageurl = "https://image.tmdb.org/t/p/w300" + publica.poster_path;
    return (
       <li className={styles.publishcard}>
        <Link to={"/publicacion/" + publica.id}>
        <img
            width={230}
            height={345} 
            className={styles.publishimage}
            src = {imageurl} 
            alt = {publica.title}/>
        </Link>
            
            <div>{publica.title}</div>
        </li>
    );
}*/
