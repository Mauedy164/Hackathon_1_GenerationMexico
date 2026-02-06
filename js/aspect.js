const btn_aspect = document.getElementById("btn_aspect")

// Verificar si hay un tema guardado en localStorage
const temaGuardado = localStorage.getItem('tema') || 'dark'

// Aplicar el tema guardado al cargar la página
document.body.setAttribute('data-theme', temaGuardado)
actualizarTextoBoton(temaGuardado)

// Event listener para el botón
btn_aspect.addEventListener('click', cambiarTema)

function cambiarTema() {
    const temaActual = document.body.getAttribute('data-theme')
    const nuevoTema = temaActual === 'dark' ? 'light' : 'dark'
    
    // Cambiar el atributo data-theme en el body
    document.body.setAttribute('data-theme', nuevoTema)
    
    // Guardar en localStorage
    localStorage.setItem('tema', nuevoTema)
    
    // Actualizar texto del botón
    actualizarTextoBoton(nuevoTema)
    
    // Animación del botón
    btn_aspect.classList.add('animate__animated', 'animate__pulse')
    setTimeout(() => {
        btn_aspect.classList.remove('animate__animated', 'animate__pulse')
    }, 500)
}

function actualizarTextoBoton(tema) {
    if (tema === 'dark') {
        btn_aspect.innerHTML = '<i class="fas fa-sun"></i> Modo Claro'
    } else {
        btn_aspect.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro'
    }
}

