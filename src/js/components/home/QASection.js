/**
 * Q&A セクション（アコーディオン，aria-expanded 対応）
 * @param {Array} qaItems - Q&A アイテムの配列
 * @returns {string} HTML文字列
 */
export function QASection(qaItems = []) {
    return `
        <section id="qa" class="fade-in">
            <div class="section-header">
                <h2>Q&A</h2>
                <span class="decoration-line"></span>
            </div>
            <div class="qa-container">
                ${qaItems.map((item, i) => `
                    <div class="qa-item">
                        <button class="qa-question-btn"
                                aria-expanded="false"
                                aria-controls="qa-answer-${i}">
                            <span class="qa-q-mark">Q.</span>
                            <span class="qa-q-text">${item.q}</span>
                            <span class="qa-toggle-icon"><i class="fa-solid fa-plus"></i></span>
                        </button>
                        <div class="qa-answer-wrapper" id="qa-answer-${i}" role="region">
                            <div class="qa-answer">
                                <span class="qa-a-mark">A.</span>
                                ${item.a}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}
