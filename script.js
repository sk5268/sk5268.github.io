document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.scroll-container');
    const slides = document.querySelectorAll('.slide');
    
    // Intersection Observer for precise visibility tracking
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.content').style.opacity = '1';
                entry.target.querySelector('.content').style.transform = 'translateY(0)';
            } else {
                entry.target.querySelector('.content').style.opacity = '0';
                entry.target.querySelector('.content').style.transform = 'translateY(30px)';
            }
        });
    }, { threshold: 0.2 });

    slides.forEach(slide => {
        const content = slide.querySelector('.content');
        content.style.opacity = '0';
        content.style.transform = 'translateY(30px)';
        content.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(slide);
    });

    // Clean keyboard nav
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            container.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp') {
            container.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        }
    });

    console.log("💎 Premium Engine Active.");
});
