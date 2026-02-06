// Carrito de compras básico
let carrito = [];
let contadorCarrito = 0;

// Función para agregar productos al carrito
function agregarAlCarrito(nombreProducto, precio) {
    // Agregar el producto al array del carrito
    carrito.push({ nombre: nombreProducto, precio: precio });

    // Actualizar el contador del carrito
    contadorCarrito++;
    document.getElementById('cart-count').textContent = contadorCarrito;

    // Mostrar alerta visual
    mostrarAlerta(`${nombreProducto} agregado al carrito por $${precio}`);

    // Animación del botón
    animarBoton(event.target);
}

// Función para mostrar alertas visuales
function mostrarAlerta(mensaje) {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = 'alerta';
    alerta.textContent = mensaje;

    // Agregar al body
    document.body.appendChild(alerta);

    // Mostrar con animación
    setTimeout(() => {
        alerta.style.opacity = '1';
        alerta.style.transform = 'translateY(0)';
    }, 100);

    // Ocultar después de 3 segundos
    setTimeout(() => {
        alerta.style.opacity = '0';
        alerta.style.transform = 'translateY(-50px)';
        setTimeout(() => {
            document.body.removeChild(alerta);
        }, 300);
    }, 3000);
}

// Función para animar botones
function animarBoton(boton) {
    boton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        boton.style.transform = 'scale(1)';
    }, 150);
}

// Función para hacer scroll suave a secciones
function scrollToSection(seccionId) {
    const seccion = document.getElementById(seccionId);
    seccion.scrollIntoView({ behavior: 'smooth' });
}

// Animaciones al hacer scroll
function animarAlScroll() {
    const elementos = document.querySelectorAll('.producto-card, .oferta-card, .testimonio-card');

    elementos.forEach(elemento => {
        const posicionElemento = elemento.getBoundingClientRect().top;
        const alturaVentana = window.innerHeight;

        if (posicionElemento < alturaVentana - 100) {
            elemento.style.animationPlayState = 'running';
        }
    });
}

// Event listener para el scroll
window.addEventListener('scroll', animarAlScroll);

// Inicializar animaciones al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Pausar animaciones inicialmente
    const elementosAnimados = document.querySelectorAll('.producto-card, .oferta-card, .testimonio-card');
    elementosAnimados.forEach(elemento => {
        elemento.style.animationPlayState = 'paused';
    });

    // Iniciar animaciones para elementos visibles
    animarAlScroll();
});

// Función para mostrar/ocultar menú en móviles (si se agrega en el futuro)
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
}

// Agregar estilos para la alerta (se puede mover a CSS si se prefiere)
const estiloAlerta = document.createElement('style');
estiloAlerta.textContent = `
    .alerta {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        opacity: 0;
        transform: translateY(-50px);
        transition: all 0.3s ease;
        font-weight: bold;
    }
`;
document.head.appendChild(estiloAlerta);
