/**
 * 個別試験カードコンポーネント
 * @param {object} exam - 試験データ
 * @param {boolean} [commentaryOpen=false] - コメンタリーが開いているか
 * @returns {string} HTML文字列
 */
export function ExamCard(exam, commentaryOpen = false) {
    const formAvailable = exam.links.form && exam.links.form !== '#';
    const hasCommentary = exam.commentary && exam.commentary.trim().length > 0;

    return `
        <div class="exam-card">
            <div class="exam-header">
                <div>
                    ${exam.number ? `<div class="exam-number-text">${exam.number}</div>` : ''}
                    <h3>${exam.title}</h3>
                </div>
                <span class="exam-date">${exam.date}</span>
            </div>
            <p class="exam-desc">${exam.description}</p>

            <div class="exam-links">
                <a href="${exam.links.question}" target="_blank" rel="noopener noreferrer" class="btn-text">
                    <i class="fa-regular fa-file-pdf"></i> 問題
                </a>
                <a href="${exam.links.answer}" target="_blank" rel="noopener noreferrer" class="btn-text">
                    <i class="fa-regular fa-file-pdf"></i> 解説
                </a>
                ${formAvailable
                    ? `<a href="${exam.links.form}" target="_blank" rel="noopener noreferrer" class="btn-text btn-form">
                        <i class="fa-brands fa-google"></i> 解答フォーム
                       </a>`
                    : ''
                }
            </div>

            <div class="exam-results">
                <h4>集計結果 (${exam.stats.statsDate})</h4>
                <!-- 横スクロールラッパー -->
                <div class="table-scroll-wrapper">
                    <table class="result-table">
                        <thead>
                            <tr>
                                <th>受験者数</th>
                                <th>平均点</th>
                                <th>標準偏差</th>
                                <th>最低点</th>
                                <th>中央値</th>
                                <th>最高点</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${exam.stats.takers}</td>
                                <td>${exam.stats.average}</td>
                                <td>${exam.stats.stdDev}</td>
                                <td>${exam.stats.min}</td>
                                <td>${exam.stats.median}</td>
                                <td>${exam.stats.max}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            ${hasCommentary ? `
                <div class="commentary-section">
                    <button
                        class="commentary-toggle"
                        data-action="toggle-commentary"
                        data-exam-id="${exam.id}"
                        aria-expanded="${commentaryOpen}"
                        aria-controls="commentary-${exam.id}">
                        出題者コメント
                        <span class="commentary-toggle-icon">
                            <i class="fa-solid fa-${commentaryOpen ? 'minus' : 'plus'}"></i>
                        </span>
                    </button>
                    <div id="commentary-${exam.id}"
                         class="commentary-panel${commentaryOpen ? ' is-open' : ''}"
                         ${commentaryOpen ? '' : 'hidden'}>
                        <p>${exam.commentary}</p>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}
