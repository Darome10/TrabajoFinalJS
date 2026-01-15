const noticiasDiv = document.getElementById('noticiasDiv');

fetch('https://newsdata.io/api/1/latest?apikey=pub_f65e8fd766504670ac0b6e7d121c9f59&country=es,co,us&category=technology,science&removeduplicate=1')
    .then(response => response.json())
    .then(data => {
        let resultados = data.results;
        resultados.forEach(noticia => {
            noticiasDiv.innerHTML += `
                <div class="noticia">
                    <h3>${noticia.title}</h3>
                    <img src="${noticia.image_url}" alt="Imagen de la noticia" width="400" height="250">
                    <p>${noticia.description}</p>
                    <a href="${noticia.link}" target="_blank">Leer más</a>
                </div>
            `
        })
    });

// Carrusel de proyectos futuros
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cajas = document.querySelectorAll('.caja');

const images = [
    './assets/listatareas.webp',
    './assets/got.webp',
    './assets/fb.webp',
];
console.log(images);
let currentIndex = 0;

cajas.forEach((caja)=>{
    const img = document.createElement('img');
    img.alt = "Proyecto futuro";
    caja.appendChild(img);
})

function updateCarousel() {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const nextIndex = (currentIndex + 1) % images.length;

    cajas.forEach((caja, index) => {
        const img = caja.querySelector('img');
        if (index === 0){
            img.src = images[prevIndex];
            console.log(img.src);
        } else if (index === 1){
            img.src = images[currentIndex];
        } else if (index === 2){
            img.src = images[nextIndex];
        }
    })
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
    updateDescripcion();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
    updateDescripcion();
});

updateCarousel();

const descripcionContainer = document.getElementById('descripcion-container'); 

const descripciones = [
    "Aplicación de lista de tarea con funcionalidades avanzadas",
    "API de los personajes de Juego de Tronos",
    "Réplica de la página de Facebook",
];

function updateDescripcion() {
    descripcionContainer.innerText = descripciones[currentIndex];
}
updateDescripcion();