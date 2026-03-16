/* global renderMathInElement */
export class Router {
    constructor(appElement, renderer, onNavigate) {
        this.appElement = appElement;
        this.renderer = renderer;
        this.onNavigate = onNavigate;
    }

    async navigate(viewName, appState, appData) {
        let contentHTML = '';
        
        if (viewName === 'home') {
            contentHTML = this.renderer.renderHome(appState, appData);
        } else {
            contentHTML = await this.renderer.renderPage(viewName);
        }

        this.appElement.innerHTML = contentHTML;
        
        if (window.renderMathInElement) {
            renderMathInElement(this.appElement, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '\\(', right: '\\)', display: false}
                ]
            });
        }
        window.scrollTo(0, 0);

        if (this.onNavigate) {
            this.onNavigate(viewName);
        }
    }
}
