import { loadContent } from '../utils/contentLoader.js';
import { HeroSection } from '../components/home/HeroSection.js';
import { NewsSection } from '../components/home/NewsSection.js';
import { UpcomingSection } from '../components/home/UpcomingSection.js';
import { QASection } from '../components/home/QASection.js';
import { PastExamsSection } from '../components/exams/PastExamsSection.js';
import { ExamCard } from '../components/exams/ExamCard.js';

export class ViewRenderer {
    /**
     * ホームページ全体の HTML を返す．
     * @param {object} [appState={}] - ビューステート（selectedYear, commentaryOpen）
     * @param {object} [appData={}] - Validated app data
     * @returns {string}
     */
    renderHome(appState = {}, appData = {}) {
        const { selectedExamId = null, commentaryOpen = new Set() } = appState;
        const { news = [], upcoming = null, exams = [], qa = [] } = appData;

        return [
            HeroSection(),
            NewsSection(news),
            UpcomingSection(upcoming),
            PastExamsSection(exams, selectedExamId, commentaryOpen, ExamCard),
            QASection(qa),
        ].join('');
    }

    /**
     * 静的ページ（出題方針・クレジット等）の HTML を返す．
     * @param {string} pageName
     * @returns {Promise<string>}
     */
    async renderPage(pageName) {
        const html = await loadContent(pageName);
        return `
            <section class="page-content fade-in">
                ${html}
            </section>
        `;
    }
}
