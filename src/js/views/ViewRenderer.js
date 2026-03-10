import { news, upcoming, qa, exams } from '../data/index.js';
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
     * @returns {string}
     */
    renderHome(appState = {}) {
        const { selectedExamId = null, commentaryOpen = new Set() } = appState;

        return [
            HeroSection(),
            NewsSection(news),
            UpcomingSection(upcoming),
            PastExamsSection(exams, selectedExamId, commentaryOpen, ExamCard),
            QASection(qa),
        ].join('');
    }

    /**
     * 静的ページ（注意事項・クレジット等）の HTML を返す．
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
