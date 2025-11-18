document.addEventListener('DOMContentLoaded', () => {
    
    // --- MENU MOBILE ---
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if(menuIcon) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- ANIMAÇÃO DE NÚMEROS ---
    const counters = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/\D/g, '');
            const inc = target / 100;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(animateCounters, 20);
            } else {
                counter.innerText = target;
            }
        });
    };
    
    // Dispara animação quando visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateCounters();
            }
        });
    });
    const statsSection = document.querySelector('.stats-row');
    if(statsSection) observer.observe(statsSection);

});