document.addEventListener("DOMContentLoaded", function () {
    // 1. Seleccionamos el contenedor y los items
    const container = document.querySelector('.hero-carrusel');
    const slides = document.querySelectorAll('.hero-item');

    // 2. Configuración
    const intervalTime = 4000; // Tiempo en milisegundos (5000ms = 5 segundos)
    let currentSlide = 0;
    let slideInterval;

    // 3. Función que realiza el movimiento
    const nextSlide = () => {
        currentSlide++;

        // Si llegamos al final, volvemos al principio (slide 0)
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        // Calculamos cuánto hay que desplazar (Ancho del contenedor * número de slide)
        const width = container.offsetWidth;
        container.scrollTo({
            left: width * currentSlide,
            behavior: 'smooth' // Desplazamiento suave
        });
    };

    // 4. Iniciar el ciclo automático
    slideInterval = setInterval(nextSlide, intervalTime);

    // 5. (Opcional) Pausar si el usuario pasa el mouse por encima
    // Esto mejora la experiencia para que el usuario pueda leer sin que se mueva
    container.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    container.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, intervalTime);
    });
});