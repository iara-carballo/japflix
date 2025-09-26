let peliculas = [];

// Cargar datos al iniciar
window.addEventListener('DOMContentLoaded', () => {
    const url = 'https://japceibal.github.io/japflix_api/movies-data.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            peliculas = data;
            console.log("Datos cargados:", data);
        })
        .catch(error => console.error("Error al cargar los datos:", error));
});

const inputBuscar = document.getElementById('inputBuscar');
const botonBuscar = document.getElementById('btnBuscar');
const lista = document.getElementById('lista');

// Mostrar películas
function mostrarPeliculas(peliculas) {
    lista.innerHTML = '';
    if (peliculas.length === 0) {
        lista.innerHTML = '<p>No se encontraron películas que coincidan con la búsqueda.</p>';
        return;
    }

    peliculas.forEach((pelicula, index) => {
        const estrellas = "⭐".repeat(Math.round(pelicula.vote_average / 2));

        const li = document.createElement('li');
        li.classList.add('list-group-item');

        li.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h5 class="mb-1">${pelicula.title}</h5>
                <small>Rating: ${estrellas}</small>
            </div>
            <button class="btn btn-info btn-sm btn-mas-info">Más información</button>
        </div>
        <div class="mas-info mt-2" style="display: none;">
            <div class="card card-body bg-dark text-light">
                <p><strong>Año:</strong> ${pelicula.release_date ? pelicula.release_date.split("-")[0] : "N/A"}</p>
                <p><strong>Duración:</strong> ${pelicula.runtime || "N/A"} min</p>
                <p><strong>Presupuesto:</strong> $${pelicula.budget?.toLocaleString() || "N/A"}</p>
                <p><strong>Ganancias:</strong> $${pelicula.revenue?.toLocaleString() || "N/A"}</p>
            </div>
        </div>
        `;

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

        li.addEventListener('click', (e) => {
            if (!e.target.matches('.btn-mas-info')) {
                mostrarDetallePelicula(pelicula);
            }
        });

        lista.appendChild(li);
    });
}

// Función para mostrar detalle completo
function mostrarDetallePelicula(pelicula) {
    document.getElementById('detalle-title').textContent = pelicula.title;
    document.getElementById('detalle-overview').textContent = pelicula.overview;

    const genresList = document.getElementById('detalle-genres');
    genresList.innerHTML = '';
    if (pelicula.genres) {
        pelicula.genres.forEach(g => {
            const li = document.createElement('li');
            li.textContent = g.name;
            genresList.appendChild(li);
        });
    }

    document.getElementById('detalle-year').textContent = pelicula.release_date ? pelicula.release_date.split("-")[0] : "N/A";
    document.getElementById('detalle-runtime').textContent = pelicula.runtime || "N/A";
    document.getElementById('detalle-budget').textContent = pelicula.budget?.toLocaleString() || "N/A";
    document.getElementById('detalle-revenue').textContent = pelicula.revenue?.toLocaleString() || "N/A";

    document.getElementById('detallePelicula').style.display = 'block';
}

// Cerrar detalle
document.getElementById('cerrarDetalle').addEventListener('click', () => {
    document.getElementById('detallePelicula').style.display = 'none';
});

document.getElementById('detallePelicula').addEventListener('click', (e) => {
    if (e.target.id === 'detallePelicula') {
        e.currentTarget.style.display = 'none';
    }
});

// Buscar películas
botonBuscar.addEventListener('click', () => {
    const terminoBusqueda = inputBuscar.value.toLowerCase().trim();
    const peliculasFiltradas = peliculas.filter(pelicula =>
        (pelicula.title && pelicula.title.toLowerCase().includes(terminoBusqueda)) ||
        (pelicula.tagline && pelicula.tagline.toLowerCase().includes(terminoBusqueda)) ||
        (pelicula.overview && pelicula.overview.toLowerCase().includes(terminoBusqueda)) ||
        (pelicula.genres && pelicula.genres.some(g => g.name.toLowerCase().includes(terminoBusqueda)))
    );
    mostrarPeliculas(peliculasFiltradas);
});

inputBuscar.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        botonBuscar.click();
    }
});
