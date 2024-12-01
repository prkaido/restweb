const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');
const nav = document.querySelector('.carousel-nav');
const indicators = Array.from(nav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Coloca las diapositivas una al lado de la otra
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});

// Función para mover al slide correcto
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

// Actualizar los indicadores de las diapositivas
const updateIndicators = (currentIndicator, targetIndicator) => {
    currentIndicator.classList.remove('current-slide');
    targetIndicator.classList.add('current-slide');
}

// Mover al siguiente slide
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentIndicator = nav.querySelector('.current-slide');
    const nextIndicator = currentIndicator.nextElementSibling;

    if (!nextSlide) return;  // Para evitar el movimiento fuera del rango

    moveToSlide(track, currentSlide, nextSlide);
    updateIndicators(currentIndicator, nextIndicator);
});

// Mover al slide anterior
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentIndicator = nav.querySelector('.current-slide');
    const prevIndicator = currentIndicator.previousElementSibling;

    if (!prevSlide) return;

    moveToSlide(track, currentSlide, prevSlide);
    updateIndicators(currentIndicator, prevIndicator);
});

// Mover al slide seleccionado con el indicador
nav.addEventListener('click', e => {
    const targetIndicator = e.target.closest('button');

    if (!targetIndicator) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentIndicator = nav.querySelector('.current-slide');
    const targetIndex = indicators.findIndex(indicator => indicator === targetIndicator);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateIndicators(currentIndicator, targetIndicator);
});
