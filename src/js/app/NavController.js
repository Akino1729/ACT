export class NavController {
    constructor(onNavigateRequest) {
        this.menuToggle = document.getElementById('menuToggle');
        this.navLinks = document.getElementById('navLinks');
        this.onNavigateRequest = onNavigateRequest;
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        
        // Navigation clicks
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('[data-link]');
            if (link) {
                e.preventDefault();
                const viewName = link.getAttribute('data-link');
                this.onNavigateRequest(viewName);
                this.closeMenu();
            }
        });
    }

    setupMobileMenu() {
        if (!this.menuToggle) return;
        const toggleMenu = () => {
            const isOpen = this.navLinks.classList.toggle('active');
            this.menuToggle.classList.toggle('open');
            this.menuToggle.setAttribute('aria-expanded', String(isOpen));
        };
        this.menuToggle.addEventListener('click', toggleMenu);
        this.menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    closeMenu() {
        if (this.navLinks) {
            this.navLinks.classList.remove('active');
        }
        if (this.menuToggle) {
            this.menuToggle.classList.remove('open');
            this.menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    updateActiveState(viewName) {
        const links = document.querySelectorAll('.nav-links a[data-link]');
        links.forEach(link => {
            if (link.getAttribute('data-link') === viewName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}
