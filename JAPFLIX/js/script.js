// Donde voy a guardar los datos de las películas
let peliculas = [];

// Espero a que la página cargue completamente
window.addEventListener('DOMContentLoaded', () => {
    const url = 'https://japceibal.github.io/japflix_api/movies-data.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            peliculas = data;
            console.log("Datos cargados:", data);
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
});

// Referencias al input, botón y contenedor de películas
const inputBuscar = document.getElementById('inputBuscar');
const botonBuscar = document.getElementById('btnBuscar');
const lista = document.getElementById('lista');

// Función para mostrar las películas
function mostrarPeliculas(peliculas) {
    lista.innerHTML = '';

    if (peliculas.length === 0) {
        lista.innerHTML = '<p>No se encontraron películas que coincidan con la búsqueda.</p>';
        return;
    }

    peliculas.forEach((pelicula, index) => {
        let estrellas = "⭐".repeat(Math.round(pelicula.vote_average / 2));

        // Creo el item principal
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.style.cursor = "pointer";

        // Contenido principal: título, rating y botón a la derecha
        li.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">${pelicula.title}</h5>
                    <small>Rating: ${estrellas}</small>
                </div>
                <button class="btn btn-info btn-sm btn-mas-info">Más información</button>
            </div>

            <!-- DESPLEGABLE ABAJO -->
            <div class="collapse mt-2 mas-info">
                <div class="card card-body bg-dark text-light">
                    <p><strong>Año:</strong> ${pelicula.release_date ? pelicula.release_date.split("-")[0] : "N/A"}</p>
                    <p><strong>Duración:</strong> ${pelicula.runtime || "N/A"} min</p>
                    <p><strong>Presupuesto:</strong> $${pelicula.budget?.toLocaleString() || "N/A"}</p>
                    <p><strong>Ganancias:</strong> $${pelicula.revenue?.toLocaleString() || "N/A"}</p>
                </div>
            </div>
        `;

        // Evento click en botón "Más información"
        const btnMasInfo = li.querySelector('.btn-mas-info');
        const masInfoDiv = li.querySelector('.mas-info');
        btnMasInfo.addEventListener('click', (e) => {
            e.stopPropagation();
            if (masInfoDiv.style.display === 'block') {
                masInfoDiv.style.display = 'none';
                btnMasInfo.textContent = 'Más información';
            } else {
                masInfoDiv.style.display = 'block';
                btnMasInfo.textContent = 'Menos información';
            }
        });

        // Evento click en LI (para abrir detalle principal)
        li.addEventListener('click', (e) => {
            if (!e.target.matches('.btn-mas-info')) {
                mostrarDetallePelicula(pelicula);
            }
        });

        lista.appendChild(li);
    });
}

// Evento botón buscar
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

// Permitir buscar con ENTER
inputBuscar.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        botonBuscar.click();
    }
});

// Función para mostrar el detalle de una película (solo título y overview, sin año, duración, presupuesto ni ganancias)
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


