import { Link } from "react-router-dom";
import styles from "./Publishcard.module.css";
//import styles from "../pages/PublishDetails.module.css";
export function Publishcard({ publica }) {
  let imageUrls = publica.fotografia_prod;
  let cleanImageUrl;
  if (imageUrls.length === 0) {
    cleanImageUrl = "https://liftlearning.com/wp-content/uploads/2020/09/default-image.png";
  } else {
    // Convertir la cadena en un array de URLs
    if (typeof imageUrls === "string") {
      imageUrls = imageUrls.split(",");
    }
    // Obtener la primera imagen si existe
    const firstImageUrl = imageUrls.length > 0 ? imageUrls[0].trim() : null;
    cleanImageUrl = firstImageUrl ? firstImageUrl.slice(2, -1) : null;
  }
  console.log(cleanImageUrl);
  return (
    <li className={styles.publishcard}>
      <Link to={`/publicacion/${publica.id}`} state={{ publica }}>
        {cleanImageUrl && (
          <img
            width={230}
            height={345}
            className={styles.publishimage}
            src={cleanImageUrl}
            alt={publica.nombre_prod}
          />
        )}
        <div>{publica.nombre_prod}</div>
        <button className={styles.botonescontainer}><strong>Revisar</strong></button>
        </Link>
    </li>
  );
}