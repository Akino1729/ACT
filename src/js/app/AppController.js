import { ViewRenderer } from '../views/ViewRenderer.js';
import { ParticleIntro } from '../intro.js';
import { state, appData, toggleCommentary } from './state.js';
import { ThemeController } from './ThemeController.js';
import { NavController } from './NavController.js';
import { TimerService } from './TimerService.js';
import { Router } from './Router.js';

export class AppController {
    constructor() {
        this.appElement = document.getElementById('app');
        this.renderer = new ViewRenderer();
        
        this.themeController = new ThemeController();
        this.timerService = new TimerService();
        
        this.router = new Router(this.appElement, this.renderer, (viewName) => {
            if (this.navController) {
                this.navController.updateActiveState(viewName);
            }
            if (viewName === 'home') {
                this.timerService.start(appData.upcoming?.examDateTime);
            } else {
                this.timerService.stop();
            }
        });

        this.navController = new NavController((viewName) => {
            this.router.navigate(viewName, state, appData);
        });

        this.init();
    }

    init() {
        new ParticleIntro();
        this.router.navigate('home', state, appData);
        this.setupEventDelegation();
    }

    setupEventDelegation() {
        document.body.addEventListener('click', (e) => {
            // Q&A アコーディオン
            const qaBtn = e.target.closest('.qa-question-btn');
            if (qaBtn) {
                const item = qaBtn.parentElement;
                const isActive = item.classList.toggle('active');
                qaBtn.setAttribute('aria-expanded', String(isActive));
            }

            // コメンタリートグル
            const commentaryBtn = e.target.closest('[data-action="toggle-commentary"]');
            if (commentaryBtn) {
                const examId = commentaryBtn.getAttribute('data-exam-id');
                toggleCommentary(examId);
                this.rerenderPastExams();
            }
        });

        document.body.addEventListener('change', (e) => {
            const examSelect = e.target.closest('[data-action="change-exam"]');
            if (examSelect) {
                state.selectedExamId = examSelect.value;
                state.commentaryOpen.clear();
                this.rerenderPastExams();
            }
        });
    }

    rerenderPastExams() {
        const section = document.getElementById('past-exams');
        if (!section) return;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.renderer.renderHome(state, appData);
        const newSection = tempDiv.querySelector('#past-exams');
        if (newSection) {
            section.replaceWith(newSection);
        }
    }
}
