// Navegación móvil
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// FAQ Interactivo
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.faq-icon');
    const allAnswers = document.querySelectorAll('.faq-answer');
    const allIcons = document.querySelectorAll('.faq-icon');
    
    // Cerrar todas las otras respuestas
    allAnswers.forEach((item, index) => {
        if (item !== answer) {
            item.classList.remove('active');
            allIcons[index].textContent = '+';
            allIcons[index].style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle la respuesta actual
    if (answer.classList.contains('active')) {
        answer.classList.remove('active');
        icon.textContent = '+';
        icon.style.transform = 'rotate(0deg)';
    } else {
        answer.classList.add('active');
        icon.textContent = '−';
        icon.style.transform = 'rotate(180deg)';
    }
}

// Modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Agregar event listener para cerrar con Escape
        document.addEventListener('keydown', handleModalEscape);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Remover event listener
        document.removeEventListener('keydown', handleModalEscape);
    }
}

function handleModalEscape(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleModalEscape);
    }
}

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Abrir modales desde enlaces
document.addEventListener('DOMContentLoaded', () => {
    // Enlaces que abren formulario individual
    const individualLinks = document.querySelectorAll('a[href="#formulario-individual"]');
    individualLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('formulario-individual');
        });
    });
    
    // Enlaces que abren formulario corporativo
    const corporativaLinks = document.querySelectorAll('a[href="#formulario-corporativa"]');
    corporativaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('formulario-corporativa');
        });
    });
});

// Envío de formularios
function submitForm(event, formType) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const button = form.querySelector('button[type="submit"]');
    
    // Estado de carga
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    button.disabled = true;
    button.classList.add('loading');
    
    // Simular envío (aquí integrarías con tu backend o servicio de email)
    setTimeout(() => {
        // Datos del formulario
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        console.log('Form submitted:', formType, data);
        
        // Éxito
        button.textContent = '¡Enviado exitosamente!';
        button.classList.remove('loading');
        button.classList.add('success');
        
        // Resetear formulario después de 3 segundos
        setTimeout(() => {
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
            button.classList.remove('success');
            
            // Cerrar modal si existe
            const modal = form.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
            
            // Mostrar mensaje de confirmación
            showSuccessMessage(formType);
            
        }, 3000);
        
    }, 2000);
}

function showSuccessMessage(formType) {
    let message = '';
    
    switch (formType) {
        case 'individual':
        case 'individual-detail':
            message = '¡Gracias por tu interés! Te contactaremos dentro de 24 horas para coordinar la clase demostrativa.';
            break;
        case 'corporativa':
        case 'corporativa-detail':
            message = '¡Gracias por tu interés! Te enviaremos una propuesta personalizada dentro de 48 horas.';
            break;
        default:
            message = '¡Gracias por contactarnos! Te responderemos pronto.';
    }
    
    // Crear elemento de mensaje
    const messageEl = document.createElement('div');
    messageEl.className = 'success-message';
    messageEl.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <p>${message}</p>
        </div>
    `;
    
    // Estilos CSS dinámicos
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48bb78;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(messageEl);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        messageEl.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 500);
    }, 5000);
}

// Animaciones CSS dinámicas
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-links.active {
        display: flex;
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        z-index: 999;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .success-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .success-icon {
        background: rgba(255,255,255,0.2);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
    }
    
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }
        
        .nav-links {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Función para abrir Calendly
function openCalendly() {
    window.open('https://calendly.com/leodiazdt/consultas', '_blank');
}

// Smooth scroll para navegación interna
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // No prevenir default si es un modal
        if (href.includes('formulario-')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Ajustar por header fijo
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animación de entrada para elementos
function animateOnScroll() {
    const elements = document.querySelectorAll('.modulo, .demo-item, .beneficio-item, .modalidad-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializar animaciones cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Google Analytics tracking (opcional)
function trackEvent(action, category, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Tracking de eventos importantes
document.addEventListener('DOMContentLoaded', () => {
    // Tracking de clicks en CTAs principales
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', () => {
            const text = button.textContent.trim();
            trackEvent('click', 'CTA', text);
        });
    });
    
    // Tracking de apertura de FAQ
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const text = question.querySelector('h4').textContent.trim();
            trackEvent('faq_open', 'FAQ', text);
        });
    });
    
    // Tracking de navegación entre páginas
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            trackEvent('page_navigation', 'Navigation', href);
        });
    });
});

// Validación de formularios mejorada
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Agregar validación en tiempo real a los formularios
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        const emailInputs = form.querySelectorAll('input[type="email"]');
        const phoneInputs = form.querySelectorAll('input[type="tel"]');
        
        emailInputs.forEach(input => {
            input.addEventListener('blur', () => {
                const isValid = validateEmail(input.value);
                if (input.value && !isValid) {
                    input.style.borderColor = '#f56565';
                    showFieldError(input, 'Por favor ingresa un email válido');
                } else {
                    input.style.borderColor = '#e2e8f0';
                    hideFieldError(input);
                }
            });
        });
        
        phoneInputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value && !validatePhone(input.value)) {
                    input.style.borderColor = '#f56565';
                    showFieldError(input, 'Por favor ingresa un teléfono válido');
                } else {
                    input.style.borderColor = '#e2e8f0';
                    hideFieldError(input);
                }
            });
        });
    });
});

function showFieldError(input, message) {
    hideFieldError(input); // Remover error previo
    
    const errorEl = document.createElement('div');
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    errorEl.style.cssText = 'color: #f56565; font-size: 0.8rem; margin-top: 0.25rem;';
    
    input.parentNode.appendChild(errorEl);
}

function hideFieldError(input) {
    const errorEl = input.parentNode.querySelector('.field-error');
    if (errorEl) {
        errorEl.remove();
    }
}

// Preloader simple (opcional)
function showPageLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    const spinner = loader.querySelector('.loader-spinner');
    spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 4px solid #e2e8f0;
        border-top: 4px solid #2c5282;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    document.body.appendChild(loader);
    
    // Agregar keyframes para spinner
    if (!document.querySelector('#spinner-styles')) {
        const spinnerStyles = document.createElement('style');
        spinnerStyles.id = 'spinner-styles';
        spinnerStyles.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinnerStyles);
    }
    
    return loader;
}

function hidePageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.remove();
    }
}

// Utilidad para detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes específicos para móvil
if (isMobile()) {
    document.addEventListener('DOMContentLoaded', () => {
        // Ajustar altura de hero en móviles
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.minHeight = '100vh';
        }
        
        // Mejorar UX de formularios en móvil
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                setTimeout(() => {
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
        });
    });
}