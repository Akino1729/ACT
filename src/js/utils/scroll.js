/**
 * Scroll interactions utility
 */

export function initScrollEffects() {
    const bgParallax = document.getElementById('bgParallax');
    
    if (!bgParallax) return;

    // Parallax background logic
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        // Background moves at 0.25x speed (more subtle) by shifting its position
        // This allows background-repeat: repeat to work indefinitely
        bgParallax.style.backgroundPositionY = `${-scrolled * 0.25}px`;
    }, { passive: true });
}

export function scrollToTop(e) {
    if (e) e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
