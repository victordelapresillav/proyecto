//import React from "react";
import React, { useEffect, useState } from "react";
import styles from "../pages/PublishDetails.module.css";
import { useParams } from "react-router-dom";
import { fetchData } from "../Util/Client";
export function BotonPublicar({ tarjetaId, publicado, onPublicar, onRetirar }) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  //const [item, setItem] = useState(null);
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
  //console.log(data);
  const datapub = data.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});

  //publicar en joomla
  const handlePublicar = () => {
    onPublicar(tarjetaId);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer c2hhMjU2Ojk1NjpjYTM2NzZlMTQ0YWM0MTE0Y2MzMWZlZGJjMzg0YmVlZDA2YTdjZjYwOTc0YzNhMWMzY2ZiNTI2MWVlODBlYTM3");
  
    let currentAlias = datapub[tarjetaId].id; // Obtener el alias actual
    let categoryId = 13; // Categoría por defecto (camarón)
  
    // Verificar si el nombre del producto contiene "tilapia" o "mojarra"
    const productName = datapub[tarjetaId].nombre_prod.toLowerCase();
    if (productName.includes("tilapia") || productName.includes("mojarra")) {
      categoryId = 12; // Categoría 12 (tilapia)
    }
  
    // Generar un número aleatorio único de 4 dígitos
    let randomNumber = Math.floor(Math.random() * 9000) + 1000;
  
    // Construir el nuevo alias agregando el número aleatorio al final
    let newAlias = `${currentAlias}-${randomNumber}`;
    var raw = JSON.stringify({
      "alias": newAlias, // Usar el nuevo alias
      "articletext": datapub[tarjetaId].detalles_prod,
      "catid": categoryId, // Usar la categoría correspondiente
      "language": "*",
      "metadesc": "",
      "metakey": "",
      "title": datapub[tarjetaId].nombre_prod,
      "state": 1,
      "id": datapub[tarjetaId].id
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    fetch("https://dev.auakan.com/api/index.php/v1/content/articles", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  
  
  
  //eliminar la publicación de joomla
  const handleRetirar = () => {
    onRetirar(tarjetaId);
    // Agregar aquí el código para retirar el artículo en Joomla utilizando el endpoint de Joomla
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer c2hhMjU2Ojk1NjpjYTM2NzZlMTQ0YWM0MTE0Y2MzMWZlZGJjMzg0YmVlZDA2YTdjZjYwOTc0YzNhMWMzY2ZiNTI2MWVlODBlYTM3");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

var firstId;

fetch("https://dev.auakan.com/api/index.php/v1/content/articles", requestOptions)
  .then(response => response.json())
  .then(result => {
    const articles = result.data;
    if (Array.isArray(articles) && articles.length > 0) {
      firstId = articles[0].id;
      console.log(firstId);

      var myHeaders2 = new Headers();
      myHeaders2.append("Content-Type", "application/json");
      myHeaders2.append("Authorization", "Bearer c2hhMjU2Ojk1NjpjYTM2NzZlMTQ0YWM0MTE0Y2MzMWZlZGJjMzg0YmVlZDA2YTdjZjYwOTc0YzNhMWMzY2ZiNTI2MWVlODBlYTM3");

      var raw2 = JSON.stringify({
        "catid": 12,
        "title": datapub[tarjetaId].nombre_prod,
        "state": -2,
      });

      var requestOptions2 = {
        method: 'PATCH',
        headers: myHeaders2,
        body: raw2,
        redirect: 'follow'
      };

      fetch(`https://dev.auakan.com/api/index.php/v1/content/articles/${firstId}`, requestOptions2)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    } else {
      console.log('No se encontraron artículos.');
    }
  })
  .catch(error => console.log('error', error));

// No puedes utilizar la constante `firstId` aquí fuera del bloque .then porque el bloque .then se ejecuta de manera asincrónica. Debes usar `firstId` dentro del segundo bloque .then.

};


  return (
    <div className={styles.botonescontainer}>
      {publicado ? (
        <h1 className={styles.leyendas}>Este Articulo se encuentra publicado en Auakán</h1>
      ) : (
        <h1 className={styles.leyendas}>Este Articulo no se encuentra publicado en Auakán</h1>
      )}

      {publicado ? (
        <button className={styles.botonescontainer} onClick={handleRetirar}>
          <strong>RETIRAR</strong>
        </button>
      ) : (
        <button className={styles.botonescontainer} onClick={handlePublicar}>
          <strong>PUBLICAR</strong>
        </button>
      )}
    </div>
  );
}

export default BotonPublicar;
