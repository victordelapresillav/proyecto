import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../Util/Client";
import styles from "./PublishDetails.module.css";
import BotonPublicar from "../components/BotonPublicar";

export function PublishDetails() {

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [item, setItem] = useState(null);
  console.log()
  useEffect(() => {
    fetchData()
      .then((result) => {
        const filteredData = result.filter((item) => item.id === id);
        const updatedData = filteredData.map((item) => ({
          ...item,
          publicado: localStorage.getItem(`publicado_${item.id}`) === "true",
        }));
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handlePublicar = (itemId) => {
    const updatedData = data.map((item) => {
      if (item.id === itemId) {
        localStorage.setItem(`publicado_${itemId}`, "true");
        return {
          ...item,
          publicado: true,
        };
      }
      return item;
    });
    setData(updatedData);
  };

  const handleRetirar = (itemId) => {
    const updatedData = data.map((item) => {
      if (item.id === itemId) {
        localStorage.setItem(`publicado_${itemId}`, "false");
        return {
          ...item,
          publicado: false,
        };
      }
      return item;
    });
    setData(updatedData);
  };

  return (
    <div className={styles.DetailsContainer}>
      {data.map((item) => (
        <div key={item.id} className={styles.cardContainer}>
          <img className={styles.publicimage} src={item.fotografia_prod} alt={item.nombre} />
          <div className={styles.pubdet}>
            <p className={styles.firstItem}>
              <strong>Producto: </strong>
              {item.nombre_prod}
            </p>
            <p>
              <strong>Detalles del producto: </strong>
              {item.detalles_prod}
            </p>
            <p>
              <strong>Nombre del vendedor: </strong>
              {item.nombre}
            </p>
          </div>
          <div>
            <BotonPublicar
              tarjetaId={item.id}
              publicado={item.publicado}
              onPublicar={handlePublicar}
              onRetirar={handleRetirar}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
//export default item;