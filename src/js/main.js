import { ViewRenderer } from './views/ViewRenderer.js';
import { upcoming, news, exams, qa } from './data/index.js';
import { ParticleIntro } from './intro.js';
import { validateNews, validateExams, validateUpcoming, validateQA } from './utils/validateData.js';
import { state, getLatestExamId, toggleCommentary } from './app/state.js';

// 起動時にデータバリデーションを実行し，問題があればコンソールに警告を出す
validateNews(news);
validateExams(exams);
validateUpcoming(upcoming);
validateQA(qa);

class App {
    constructor() {
        this.appElement = document.getElementById('app');
        this.renderer = new ViewRenderer();
        this.menuToggle = document.getElementById('menuToggle');
        this.navLinks = document.getElementById('navLinks');
        this.countdownInterval = null;

        // 初回選択を最新の試験に初期化
        state.selectedExamId = getLatestExamId(exams);
        
        this.init();
    }

    init() {
        // イントロアニメーションを開始
        new ParticleIntro();
        
        // 初回レンダリング (ホーム)
        this.updateView('home');

        // イベントリスナーをセットアップ
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupThemeToggle();
    }

    setupNavigation() {
        document.body.addEventListener('click', (e) => {
            // ナビゲーションリンク
            const link = e.target.closest('[data-link]');
            if (link) {
                e.preventDefault();
                const viewName = link.getAttribute('data-link');
                this.updateView(viewName);
                
                // モバイルメニューを閉じる
                this.navLinks.classList.remove('active');
                if (this.menuToggle) {
                    this.menuToggle.classList.remove('open');
                    this.menuToggle.setAttribute('aria-expanded', 'false');
                }
            }

            // Q&A アコーディオン
            const qaBtn = e.target.closest('.qa-question-btn');
            if (qaBtn) {
                const item = qaBtn.parentElement;
                const isActive = item.classList.toggle('active');
                // aria-expanded を開閉状態に合わせて更新
                qaBtn.setAttribute('aria-expanded', String(isActive));
            }

            // コメンタリートグル
            const commentaryBtn = e.target.closest('[data-action="toggle-commentary"]');
            if (commentaryBtn) {
                const examId = commentaryBtn.getAttribute('data-exam-id');
                toggleCommentary(examId);
                // 過去問セクションのみ差分更新
                this.rerenderPastExams();
            }
        });

        // 試験セレクターの変更イベント
        document.body.addEventListener('change', (e) => {
            const examSelect = e.target.closest('[data-action="change-exam"]');
            if (examSelect) {
                state.selectedExamId = examSelect.value;
                state.commentaryOpen.clear(); // 切替時はコメンタリーを全閉じる
                this.rerenderPastExams();
            }
        });
    }

    /**
     * 過去問セクションのみを再描画する．年度切替・コメンタリートグル時に使用．
     */
    rerenderPastExams() {
        const { PastExamsSection } = this._components || {};
        const section = document.getElementById('past-exams');
        if (!section) return;

        // セクションを完全に再生成するため innerHTML を更新
        // （本プロジェクトの規模では十分なアプローチ）
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.renderer.renderHome(state);
        const newSection = tempDiv.querySelector('#past-exams');
        if (newSection) {
            section.replaceWith(newSection);
        }
    }

    setupMobileMenu() {
        if (!this.menuToggle) return;

        const toggleMenu = () => {
            const isOpen = this.navLinks.classList.toggle('active');
            this.menuToggle.classList.toggle('open');
            // aria-expanded を開閉状態に合わせて更新
            this.menuToggle.setAttribute('aria-expanded', String(isOpen));
        };

        this.menuToggle.addEventListener('click', toggleMenu);

        // キーボードアクセシビリティ: Enter / Space でも開閉できるようにする
        this.menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    setupThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;

        // 保存されたテーマを読み込む
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    async updateView(viewName) {
        // 既存のカウントダウンインターバルをクリア
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }

        let contentHTML = '';
        
        if (viewName === 'home') {
            // 現在のステートを渡してビューを生成
            contentHTML = this.renderer.renderHome(state);
        } else {
            // 非同期でコンテンツを取得
            contentHTML = await this.renderer.renderPage(viewName);
        }

        this.appElement.innerHTML = contentHTML;
        
        // ナビゲーションのアクティブ状態を更新
        this.updateNavActiveState(viewName);
        
        // ホームページのみカウントダウンを開始
        if (viewName === 'home') {
            this.startCountdown();
        }
        
        // 数式をレンダリング
        if (window.renderMathInElement) {
            renderMathInElement(this.appElement, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '\\(', right: '\\)', display: false}
                ]
            });
        }

        // ページトップに戻る
        window.scrollTo(0, 0);
    }

    updateNavActiveState(viewName) {
        const links = document.querySelectorAll('.nav-links a[data-link]');
        links.forEach(link => {
            if (link.getAttribute('data-link') === viewName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    startCountdown() {
        const countdownElement = document.getElementById('countdown-timer');
        if (!countdownElement || !upcoming?.examDateTime) return;

        const targetDate = upcoming.examDateTime;

        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate - now;

            if (diff <= 0) {
                countdownElement.innerHTML = `
                    <span class="countdown-ended">試験開始</span>
                `;
                clearInterval(this.countdownInterval);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <div class="countdown-unit">
                    <span class="countdown-value">${String(days).padStart(2, '0')}</span>
                    <span class="countdown-text">日</span>
                </div>
                <span class="countdown-separator">:</span>
                <div class="countdown-unit">
                    <span class="countdown-value">${String(hours).padStart(2, '0')}</span>
                    <span class="countdown-text">時間</span>
                </div>
                <span class="countdown-separator">:</span>
                <div class="countdown-unit">
                    <span class="countdown-value">${String(minutes).padStart(2, '0')}</span>
                    <span class="countdown-text">分</span>
                </div>
                <span class="countdown-separator">:</span>
                <div class="countdown-unit">
                    <span class="countdown-value">${String(seconds).padStart(2, '0')}</span>
                    <span class="countdown-text">秒</span>
                </div>
            `;
        };

        // 初回更新
        updateCountdown();
        // 1秒ごとに更新
        this.countdownInterval = setInterval(updateCountdown, 1000);
    }
}

// アプリケーションを起動
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
