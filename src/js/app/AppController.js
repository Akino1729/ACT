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

            // 試験トグル（プレミアムドロップダウン）
            const examToggle = e.target.closest('[data-action="change-exam"]');
            if (examToggle) {
                const newValue = examToggle.getAttribute('data-value');
                if (state.selectedExamId !== newValue) {
                    state.selectedExamId = newValue;
                    state.commentaryOpen.clear();
                    this.rerenderPastExams();
                }
            }

            // ドロップダウンの開閉
            const dropdownBtn = e.target.closest('[data-action="toggle-dropdown"]');
            if (dropdownBtn) {
                const dropdown = dropdownBtn.closest('.premium-dropdown');
                const isActive = dropdown.classList.toggle('active');
                dropdownBtn.setAttribute('aria-expanded', String(isActive));
            } else {
                // ドロップダウン以外をクリックしたら閉じる
                document.querySelectorAll('.premium-dropdown.active').forEach(d => {
                    d.classList.remove('active');
                    d.querySelector('.dropdown-trigger').setAttribute('aria-expanded', 'false');
                });
            }

            // スムーズスクロール (トップに戻る / ロゴ)
            const topBtn = e.target.closest('#backToTop, .logo');
            if (topBtn) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
