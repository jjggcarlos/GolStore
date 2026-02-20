/* ========================================
   GolStore - JavaScript Mejorado
   ======================================== */

// Carrito de compras
let carrito = [];
let contadorCarrito = 0;

// ========================================
// Funciones del Carrito
// ========================================

function agregarAlCarrito(nombreProducto, precio, imagen) {
    // Agregar producto al array
    const producto = {
        nombre: nombreProducto,
        precio: precio,
        imagen: imagen,
        id: Date.now()
    };
    carrito.push(producto);
    
    // Actualizar contador
    contadorCarrito++;
    document.getElementById('cart-count').textContent = contadorCarrito;
    
    // Actualizar visual del carrito
    actualizarCarritoVisual();
    
    // Mostrar toast de éxito
    mostrarToast('success', '¡Producto agregado!', `${nombreProducto} se agregó al carrito`);
    
    // Animación del botón
    const boton = event.target;
    boton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        boton.style.transform = 'scale(1)';
    }, 150);
}

function actualizarCarritoVisual() {
    const contenedor = document.getElementById('carritoItems');
    const totalSpan = document.getElementById('carritoTotal');
    
    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        totalSpan.textContent = '0 COP';
        return;
    }
    
    let html = '';
    let total = 0;
    
    carrito.forEach((producto, index) => {
        total += producto.precio;
        html += `
            <div class="carrito-item" style="display: flex; align-items: center; gap: 15px; padding: 15px; border-bottom: 1px solid #eee; animation: fadeInUp 0.3s ease-out;">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;" onerror="this.src='https://via.placeholder.com/60x60/1a1a2e/4CAF50?text=IMG'">
                <div style="flex: 1;">
                    <h4 style="font-size: 0.95rem; margin-bottom: 5px;">${producto.nombre}</h4>
                    <p style="color: #00d4ff; font-weight: 700;">${producto.precio.toLocaleString()} COP</p>
                </div>
                <button onclick="eliminarDelCarrito(${index})" style="background: #ff6b6b; color: #fff; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; transition: transform 0.2s;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
    totalSpan.textContent = total.toLocaleString() + ' COP';
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    contadorCarrito--;
    document.getElementById('cart-count').textContent = contadorCarrito;
    actualizarCarritoVisual();
    
    if (carrito.length === 0) {
        toggleCarrito();
    }
}

function toggleCarrito() {
    const carritoFlotante = document.getElementById('carritoFlotante');
    carritoFlotante.classList.toggle('active');
}

// ========================================
// Toast Notifications
// ========================================

function mostrarToast(tipo, titulo, mensaje) {
    const contenedor = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <div class="toast-content">
            <p class="toast-title">${titulo}</p>
            <p class="toast-message">${mensaje}</p>
        </div>
    `;
    
    contenedor.appendChild(toast);
    
    // Animación de entrada
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.4s ease-out';
    }, 10);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.4s ease-out forwards';
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}

// ========================================
// Scroll Suave
// ========================================

function scrollToSection(seccionId) {
    const seccion = document.getElementById(seccionId);
    if (seccion) {
        seccion.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================================
// Header con Scroll
// ========================================

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// Menú Móvil
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Animación del ícono
            const icono = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icono.classList.remove('fa-bars');
                icono.classList.add('fa-times');
            } else {
                icono.classList.remove('fa-times');
                icono.classList.add('fa-bars');
            }
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    const enlaces = document.querySelectorAll('nav ul li a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', () => {
            nav.classList.remove('active');
            const icono = menuToggle.querySelector('i');
            icono.classList.remove('fa-times');
            icono.classList.add('fa-bars');
        });
    });
    
    // Inicializar animaciones de scroll
    inicializarAnimacionesScroll();
    
    // Efecto parallax sutil en el hero
    inicializarParallax();
});

// ========================================
// Animaciones al Scroll
// ========================================

function inicializarAnimacionesScroll() {
    const elementos = document.querySelectorAll('.producto-card, .oferta-card, .testimonio-card');
    
    const observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elementos.forEach(elemento => {
        elemento.style.animationPlayState = 'paused';
        observador.observe(elemento);
    });
}

// ========================================
// Efecto Parallax
// ========================================

function inicializarParallax() {
    const hero = document.querySelector('.hero');
    const heroParticles = document.querySelector('.hero-particles');
    
    if (hero && heroParticles) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroParticles.style.transform = `translateY(${rate}px)`;
        });
    }
}

// ========================================
// Animación de Números
// ========================================

function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Inicializar contadores animados cuando sean visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(num => {
                const end = parseInt(num.textContent.replace(/[^0-9]/g, ''));
                num.textContent = '0';
                animateNumber(num, 0, end, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ========================================
// Efectos de Cursor
// ========================================

document.addEventListener('mousemove', function(e) {
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX - 150}px;
        top: ${e.clientY - 150}px;
        transition: transform 0.1s ease-out;
    `;
    document.body.appendChild(cursorGlow);
    
    setTimeout(() => {
        cursorGlow.remove();
    }, 100);
});

// ========================================
// Sonido (Opcional - comentado)
// ========================================

// function playSound(type) {
//     const sounds = {
//         click: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQoAMpLh...',
//         success: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQoAMpLh...'
//     };
//     // Implementar según necesidad
// }

// ========================================
// Keyboard Shortcuts
// ========================================

document.addEventListener('keydown', function(e) {
    // ESC para cerrar carrito
    if (e.key === 'Escape') {
        const carritoFlotante = document.getElementById('carritoFlotante');
        if (carritoFlotante.classList.contains('active')) {
            toggleCarrito();
        }
    }
    
    // C para abrir carrito
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
        const tag = e.target.tagName.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
            toggleCarrito();
        }
    }
});

// ========================================
// Preloader (Opcional)
// ========================================

window.addEventListener('load', function() {
    // Ocultar si hay un preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Animación de entrada del header
    const header = document.querySelector('header');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        header.style.transition = 'all 0.5s ease-out';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 100);
});

// ========================================
// Smooth Scroll para enlaces internos
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Lazy Loading para imágenes
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Console Easter Egg
// ========================================

console.log('%c⚽ GolStore - ¡Bienvenido!', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%c❤️ Hecho con amor para los amantes del fútbol', 'color: #ff6b6b;');

/* ========================================
   Estilos adicionales inyectados dinámicamente
   ======================================== */

const estiloAdicional = document.createElement('style');
estiloAdicional.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .producto-card, .oferta-card, .testimonio-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .producto-card.visible, .oferta-card.visible, .testimonio-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .carrito-item {
        animation: fadeInUp 0.3s ease-out !important;
    }
    
    /* Efecto shine en botones */
    .btn-agregar::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        transition: left 0.5s;
    }
    
    .btn-agregar:hover::before {
        left: 100%;
    }
    
    /* Loader para imágenes */
    .producto-imagen, .oferta-imagen {
        position: relative;
    }
    
    .producto-imagen::after, .oferta-imagen::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transform: translateX(-100%);
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(estiloAdicional);
