//Donde voy a guardar los datos de las peliculas
let peliculas = [];


// Espero a que la página cargue completamente
window.addEventListener('DOMContentLoaded', () => {
    // URL del JSON con la información de las películas que me dieron en la letra de la actividad
    const url = 'https://japceibal.github.io/japflix_api/movies-data.json';

    // Uso fetch para traer los datos
    fetch(url)
        .then(response => response.json()) // Convierto la respuesta a JSON
        .then(data => {
            peliculas = data; //Guardo los datos en la variable global
            // Ya tengo el listado de películas en la variable 'data'
            console.log("Datos cargados:", data);
            // No muestro nada en la página, solo en consola
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
});
// Referencias al imput, botón y contenedor de películas
const inputBuscar = document.getElementById('inputBuscar');
const botonBuscar = document.getElementById('btnBuscar');
const lista = document.getElementById('lista');

// Función para mostrar las peliculas 
function mostrarPeliculas(peliculas) {
    lista.innerHTML = ''; // Limpio el contenedor antes de mostrar nuevas películas

    if (peliculas.length === 0) {
        lista.innerHTML = '<p>No se encontraron películas que coincidan con la búsqueda.</p>';
        return;
    }
    peliculas.forEach(pelicula => {
        let estrellas = "⭐".repeat(Math.round(pelicula.vote_average / 2));

        lista.innerHTML += `
            <li class="list-group-item">
                <h3>${pelicula.title}</h3>
                <p>Rating: ${estrellas}</p>
            </li>
        `;
    });
}

//evento boton buscar

botonBuscar.addEventListener('click', () => {
    let terminoBusqueda = inputBuscar.value.toLowerCase().trim();

    const peliculasFiltradas = peliculas.filter(pelicula =>
        (pelicula.title && pelicula.title.toLowerCase().includes(terminoBusqueda)) ||
        (pelicula.tagline && pelicula.tagline.toLowerCase().includes(terminoBusqueda)) ||
        (pelicula.overview && pelicula.overview.toLowerCase().includes(terminoBusqueda)) ||
        (pelicula.genres && pelicula.genres.some(g => g.name.toLowerCase().includes(terminoBusqueda)))
    );

    mostrarPeliculas(peliculasFiltradas);
});

  // Permitir buscar también con ENTER
inputBuscar.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        botonBuscar.click();
    }

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log("El usuario tiene modo oscuro activado");
} else {
    console.log("El usuario tiene modo claro activado");
}

});
