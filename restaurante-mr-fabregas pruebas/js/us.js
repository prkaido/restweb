const searchToggle = document.getElementById('search-toggle');
const searchContainer = document.querySelector('.search-container');

searchToggle.addEventListener('click', () => {
    // Alterna la clase 'active' en el contenedor de búsqueda
    searchContainer.classList.toggle('active');

    // Si deseas enfocar la barra de búsqueda al abrirla
    if (searchContainer.classList.contains('active')) {
        const searchBar = document.querySelector('.search-bar');
        searchBar.focus(); // Enfoca la barra de búsqueda cuando se despliega
    }
});
