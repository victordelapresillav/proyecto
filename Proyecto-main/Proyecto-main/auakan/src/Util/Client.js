/*const API = 'https://api.themoviedb.org/3';
export function get(path) {
    return fetch(API + path, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWYwY2YxN2E5MDA1NTUzOGY3ZTdkMjA0YjkyNGMzNyIsInN1YiI6IjY0NGI2NmY1ZmJhNjI1MDRkYWQ1YWM4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HhvuhecjSTHTkm7-LfWb4o_hHSLS_EK17kq2GeTdqlk",
            "Content-Type": "application/json;charset=utf-8",
        },
    }).then(result => result.json());

}*/

const API = 'https://auakanapi.000webhostapp.com/api.php?request=getAnuncios';
export function fetchData() {
    return fetch(API).then(result => result.json());

}