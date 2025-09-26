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

    peliculas.forEach((pelicula, index) => {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.style.cursor = "pointer";

    
        let estrellas = "⭐".repeat(Math.round(pelicula.vote_average / 2));
        li.innerHTML += `
                <h3>${pelicula.title}</h3>
                <p>Rating: ${estrellas}</p>
          
        `;
        // Evento click en la película
        li.addEventListener('click', () => {
            mostrarDetallePelicula(pelicula);
        });

        lista.appendChild(li);
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
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log("El usuario tiene modo oscuro activado");
} else {
    console.log("El usuario tiene modo claro activado");
}

// Función para mostrar el detalle de una película
function mostrarDetallePelicula(pelicula) {
    document.getElementById('detalle-title').textContent = pelicula.title;
    document.getElementById('detalle-overview').textContent = pelicula.overview;

    const genresList = document.getElementById('detalle-genres');
    genresList.innerHTML = '';
    if (pelicula.genres) {
        pelicula.genres.forEach(g => {
            let li = document.createElement('li');
            li.textContent = g.name;
            genresList.appendChild(li);
        });
    }

    document.getElementById('detallePelicula').style.display = 'block';
}

// Evento para cerrar el detalle
document.getElementById('cerrarDetalle').addEventListener('click', () => {
    document.getElementById('detallePelicula').style.display = 'none';

});

document.getElementById('detallePelicula').addEventListener('click', (e) => {
    if (e.target.id === 'detallePelicula') {
        e.currentTarget.style.display = 'none';
    }
});

