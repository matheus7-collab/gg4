// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. ANIMAÇÃO DOS NÚMEROS (Contador) --- */
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Quanto menor, mais rápido

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                // Pega o valor final do atributo data-target
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/\D/g, ''); // Remove pontos/símbolos para calcular
                
                // Define o incremento
                const inc = target / speed;

                if (count < target) {
                    // Adiciona o incremento e formata com pontuação (ex: 50.000)
                    counter.innerText = Math.ceil(count + inc).toLocaleString('pt-BR');
                    setTimeout(updateCount, 20);
                } else {
                    // Garante que termine no número exato
                    counter.innerText = target.toLocaleString('pt-BR');
                    
                    // Adiciona o '%' se o original tinha (gambiarra visual para o 98%)
                    if(counter.getAttribute('data-suffix')) {
                        counter.innerText += counter.getAttribute('data-suffix');
                    }
                }
            };
            updateCount();
        });
    };

    // Observer para disparar a animação apenas quando a seção estiver visível
    const observerOptions = { threshold: 0.5 }; // 50% do elemento visível
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target); // Para de observar depois que animou
            }
        });
    }, observerOptions);

    // Começa a observar a seção de estatísticas (precisa adicionar a classe .stats-row no HTML)
    const statsSection = document.querySelector('.stats-row');
    if(statsSection) observer.observe(statsSection);


    /* --- 2. SCROLL REVEAL (Elementos aparecendo ao rolar) --- */
    const revealElements = document.querySelectorAll('.card, .text-column, .image-wrapper');

    const revealScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealScroll);
});