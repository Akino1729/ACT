/**
 * ニュースセクション
 * @param {Array} newsItems - ニュースアイテムの配列
 * @param {number} [maxVisibleItems=5] - スクロールなしで表示する最大件数
 * @returns {string} HTML文字列
 */
export function NewsSection(newsItems = [], maxVisibleItems = 5) {
    // 件数が上限を超えた場合，スクロール可能なコンテナにする
    const scrollable = newsItems.length > maxVisibleItems;

    return `
        <section id="news" class="fade-in">
            <div class="section-header">
                <h2>NEWS</h2>
                <span class="decoration-line"></span>
            </div>
            <div class="news-box${scrollable ? ' is-scrollable' : ''}" aria-label="最新ニュース">
                <ul class="news-list">
                    ${newsItems.map((item) => `
                        <li>
                            <a href="${item.link || '#'}" class="news-link" ${item.link ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                <span class="date">${item.date}</span>
                                <span class="text">${item.text}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </section>
    `;
}
