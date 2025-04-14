// Fonction pour changer la langue
function changeLanguage(lang) {
    // Ici vous pouvez implémenter la logique de changement de langue
    // Pour l'instant, nous affichons juste une notification
    const notification = document.createElement('div');
    notification.className = 'language-notification';
    notification.textContent = `Langue changée en : ${lang === 'fr' ? 'Français' : 'English'}`;
    document.body.appendChild(notification);
    
    // Animation d'apparition
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Disparition après 3 secondes
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Fermer le menu lorsqu'un lien est cliqué
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Animation du header au scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Bouton retour en haut
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Modal pour les produits
    const productItems = document.querySelectorAll('.product-item');
    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');
    
    productItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.querySelector('img').src;
            const altText = this.querySelector('img').alt;
            
            modalImg.src = imgSrc;
            modalTitle.textContent = altText;
            modalDescription.textContent = `Plus d'informations sur ${altText}. Contactez-nous pour connaître les prix et disponibilités.`;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Fermer la modal en cliquant à l'extérieur
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Ici, vous pouvez ajouter le code pour envoyer les données au serveur
            // Pour l'instant, nous affichons juste un message de succès
            const notification = document.createElement('div');
            notification.className = 'form-notification success';
            notification.textContent = 'Merci pour votre message! Nous vous contacterons bientôt.';
            contactForm.appendChild(notification);
            
            // Effacer le formulaire
            this.reset();
            
            // Supprimer la notification après 5 secondes
            setTimeout(() => {
                notification.remove();
            }, 5000);
        });
    }
    
    // Mise à jour de l'année dans le footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-category, .product-card, .section-header');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialiser les éléments avec une opacité 0 pour l'animation
    document.querySelectorAll('.product-category, .product-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
});

// Chargement progressif des images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 100px 0px'
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});
