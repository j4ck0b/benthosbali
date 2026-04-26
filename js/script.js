/* =========================================
   FIX CRÍTICO - Bloquea errores externos
========================================= */
(function() {
    // 1. Capturar y SILENCIAR el error de Google Analytics
    window.addEventListener('error', function(e) {
        if (e.message.includes('deprecated parameters') || 
            e.filename.includes('feature_collector')) {
            console.warn('⚠️ Error de analytics silenciado');
            e.stopImmediatePropagation();
            e.preventDefault();
            return true; // EVITA que el error detenga la página
        }
        return false;
    }, true);
    
    // 2. Protección EXTREMA del formulario
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        console.log('🛡️ Aplicando protección al formulario...');
        
        // TÉCNICA NUCLEAR: Clonar 2 veces para eliminar TODOS los listeners
        const cleanForm1 = form.cloneNode(true);
        form.parentNode.replaceChild(cleanForm1, form);
        
        const cleanForm2 = document.getElementById('contactForm').cloneNode(true);
        document.getElementById('contactForm').parentNode.replaceChild(cleanForm2, 
            document.getElementById('contactForm'));
        
        // Verificar que funcione
        const finalForm = document.getElementById('contactForm');
        finalForm.addEventListener('submit', function() {
            console.log('✅ Formulario enviándose a:', this.action);
        }, true);
        
        console.log('✅ Formulario protegido contra errores externos');
    });
})();











/* =========================================
   DROPDOWN DE IDIOMAS
========================================= */

const langSelected = document.querySelector(".lang-selected");
const langOptions = document.querySelector(".lang-options");
const currentFlag = document.getElementById("current-flag");

// abrir/cerrar menú
if (langSelected && langOptions) {
    langSelected.addEventListener("click", (e) => {
        e.stopPropagation();
        langOptions.style.display =
            langOptions.style.display === "flex" ? "none" : "flex";
    });
}

// clic en una opción
document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        setLanguage(lang); // ← función que vive en traductor.js
        langOptions.style.display = "none";
    });
});

// cerrar si clic fuera
document.addEventListener("click", () => {
    if (langOptions) langOptions.style.display = "none";
});

/* =========================================
   INICIALIZACIÓN AL CARGAR
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    setupHeroSlider();  // ← solo slider, idioma ya lo maneja traductor.js
    setupHeaderMenu();  // Ensure menu works after DOM load
});

/* =========================================
   HERO SLIDER AUTO
========================================= */
function setupHeroSlider() {
  const slidesEl = document.getElementById("slides");
  if (!slidesEl) return; // ← ESTA LÍNEA ES LA QUE FALTABA

  const slides = Array.from(slidesEl.children);
  let index = 0;
  const total = slides.length;
  let timer;

  function nextSlide() {
    index = (index + 1) % total;
    slidesEl.style.transform = `translateX(-${index * 100}%)`;
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 3500);
  }

  startTimer();

  slidesEl.addEventListener("mouseenter", () => clearInterval(timer));
  slidesEl.addEventListener("mouseleave", startTimer);
}


/* =========================================
   HEADER MENU (MENÚ HAMBURGUESA)
========================================= */
function setupHeaderMenu(){
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');
  if (!menuToggle || !mainMenu) return;

  menuToggle.addEventListener('click', ()=>{
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    menuToggle.classList.toggle('is-active', !expanded);
    mainMenu.classList.toggle('is-visible', !expanded);
    document.body.classList.toggle('menu-open', !expanded);
    mainMenu.setAttribute('aria-hidden', expanded ? 'true' : 'false');
  });

  document.addEventListener('click', (e)=>{
    if(!menuToggle.contains(e.target) && !mainMenu.contains(e.target)){
      mainMenu.classList.remove('is-visible');
      menuToggle.classList.remove('is-active');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded','false');
      mainMenu.setAttribute('aria-hidden','true');
    }
  });
}
// setupHeaderMenu(); // Moved inside DOMContentLoaded

/* =========================================
   GALLERY manual carousel (click prev/next)
========================================= */
function setupGalleryCarousel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const track = container.querySelector(".g-track");
  const images = Array.from(track.querySelectorAll("img"));

  let index = 0;
  const total = images.length;

  function resizeImages() {
    const trackWidth = track.clientWidth;
    images.forEach(img => {
      img.style.width = trackWidth + "px";
    });
  }

  function showImage() {
    const offset = track.clientWidth * index;
    track.scrollTo({ left: offset, behavior: "smooth" });
  }

  const nextBtn = container.querySelector(".g-next");
  const prevBtn = container.querySelector(".g-prev");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % total;
      showImage();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + total) % total;
      showImage();
    });
  }

  images.forEach(img => {
    img.addEventListener("click", () => {
      window.open(img.src, "_blank");
    });
  });

  window.addEventListener("resize", () => {
    resizeImages();
    showImage();
  });

  resizeImages();
  showImage();
}
setupGalleryCarousel("galleryCarousel");
setupGalleryCarousel("galleryCarouselResort");

/* =========================================
   GOOGLE REVIEW BUTTON
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const googleBtn = document.getElementById("google-review-btn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
      googleBtn.classList.add("show");
    } else {
      googleBtn.classList.remove("show");
    }
  });

  googleBtn.addEventListener("click", () => {
    window.open(
      "https://www.google.com/travel/search?q=benthos%20bali%20dive%20resort&ved=0CAAQ5JsGahcKEwiIq8Ktz_6TAxUAAAAAHQAAAAAQCA",
      "_blank"
    );
  });
});

/* =========================================
   BUTTONS behaviour
========================================= */
function setupButtons(){
  const btnHotel = document.getElementById('btnHotel');
  if (btnHotel) {
    btnHotel.addEventListener('click', ()=> {
      window.location.href = 'hotel.html';
    });
  }

  const aboutBtn = document.getElementById('aboutBtn');
  if (aboutBtn) {
    aboutBtn.addEventListener('click', ()=> {
      location.hash = '#about';
    });
  }

  const reserveNow = document.getElementById('reserveNow');
  if (reserveNow) {
    reserveNow.addEventListener('click', ()=> {
      location.hash = '#contact';
    });
  }

  const reserveMain = document.getElementById('reserveMain');
  if (reserveMain) {
    reserveMain.addEventListener('click', ()=> {
      location.hash = '#contact';
    });
  }
}
setupButtons();


/* =========================================
   CONTACT FORM
========================================= */
/*
function setupContactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name');
    const email = fd.get('email');
    const message = fd.get('message');

    const subject = encodeURIComponent(`Contacto desde web: ${name}`);
    const body = encodeURIComponent(`${message}\n\nEmail: ${email}`);
    window.location.href = `mailto:info@ventosdive.com?subject=${subject}&body=${body}`;
  });
}
setupContactForm();
*/


/* =========================================
   WHATSAPP BUTTON
========================================= */
function setupWhatsAppButton() {
  const btn = document.getElementById('whatsappBtn');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const phone = '+34681815854'; // Spanish number provided by user
    const message = encodeURIComponent("Hello! How can we help you?");

    window.open(`https://wa.me/${phone.replace(/\D/g,'')}?text=${message}`, '_blank');
  });
}

document.addEventListener('DOMContentLoaded', setupWhatsAppButton);


/* =========================================
   ACCESSIBILITY: ESCAPE closes dropdown
========================================= */
document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape'){
    const mainMenu = document.getElementById('mainMenu');
    mainMenu.classList.remove('is-visible');
    const toggle = document.getElementById('menuToggle');
    toggle.setAttribute('aria-expanded','false');
    toggle.classList.remove('is-active');
    document.body.classList.remove('menu-open');
  }
});

/* =========================================
   RESERVE BUTTON → contacto.html
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const reserveBtn = document.getElementById("reserveMain");
  if (!reserveBtn) return; // ← evita el error si no existe

  reserveBtn.addEventListener("click", () => {
    window.location.href = "contacto.html";
  });
});










/* =========================================
   SOLUCIÓN FINAL - Desbloquea el botón de contacto
========================================= */
(function() {
    console.log('🛡️ Iniciando solución final...');
    
    // Esperar a que la página cargue completamente
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        console.log('✅ Formulario encontrado para protección');
        
        // 1. ENCONTRAR y PROTEGER el BOTÓN específicamente
        const botonSubmit = form.querySelector('button[type="submit"]');
        if (botonSubmit) {
            console.log('✅ Botón de submit encontrado:', botonSubmit);
            
            // CLONAR el botón para eliminar listeners problemáticos
            const botonNuevo = botonSubmit.cloneNode(true);
            botonSubmit.parentNode.replaceChild(botonNuevo, botonSubmit);
            
            // Agregar listener DIRECTO al nuevo botón
            document.getElementById('contactForm')
                .querySelector('button[type="submit"]')
                .addEventListener('click', function(e) {
                    console.log('🎯 CLIC en botón CAPTURADO');
                    console.log('Redirigiendo a:', form.action);
                    
                    // Forzar el envío del formulario INMEDIATAMENTE
                    form.submit();
                    
                    // Opcional: prevenir cualquier otro comportamiento
                    e.stopImmediatePropagation();
                    return false;
                }, true); // 'true' = captura el evento PRIMERO
            
            console.log('✅ Botón protegido y listo para usar');
        }
        
        // 2. También proteger el formulario por si acaso
        const nuevoForm = form.cloneNode(true);
        form.parentNode.replaceChild(nuevoForm, form);
        
        console.log('✅ Formulario clonado (listeners eliminados)');
        console.log('🎉 SOLUCIÓN APLICADA - El formulario debería funcionar');
    });
})();
/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */
function setupScrollReveal() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", setupScrollReveal);

/* =========================================
   HIDE FLOATING BUTTONS IN FOOTER
========================================= */
function setupFooterObserver() {
  const footer = document.querySelector('.site-footer');
  const googleBtn = document.getElementById('google-review-btn');
  const whatsappBtn = document.querySelector('.whatsapp-btn');

  if (!footer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (googleBtn) googleBtn.style.opacity = '0';
        if (googleBtn) googleBtn.style.pointerEvents = 'none';
        if (whatsappBtn) whatsappBtn.style.opacity = '0';
        if (whatsappBtn) whatsappBtn.style.pointerEvents = 'none';
      } else {
        // Only show Google button if scrolled down enough (logic from line 212)
        if (window.scrollY > 150) {
            if (googleBtn) googleBtn.style.opacity = '1';
            if (googleBtn) googleBtn.style.pointerEvents = 'auto';
        }
        if (whatsappBtn) whatsappBtn.style.opacity = '1';
        if (whatsappBtn) whatsappBtn.style.pointerEvents = 'auto';
      }
    });
  }, { threshold: 0.1 });

  observer.observe(footer);
}

document.addEventListener("DOMContentLoaded", setupFooterObserver);

/* Fallback for hiding buttons at the bottom */
window.addEventListener('scroll', () => {
    const scrollPosition = window.innerHeight + window.pageYOffset;
    const bodyHeight = document.documentElement.scrollHeight;
    const googleBtn = document.getElementById('google-review-btn');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (bodyHeight - scrollPosition < 200) {
        if (googleBtn) googleBtn.style.opacity = '0';
        if (whatsappBtn) whatsappBtn.style.opacity = '0';
    }
});
