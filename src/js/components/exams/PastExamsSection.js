/**
 * 過去問セクション（試験セレクター + 試験カード表示）
 * @param {Array<object>} exams - 試験データ
 * @param {string|null} selectedExamId - 現在選択されている試験ID
 * @param {Set<string>} commentaryOpen - 開いているコメンタリーの examId セット
 * @param {Function} renderCard - ExamCard 関数
 * @returns {string} HTML文字列
 */
export function PastExamsSection(exams, selectedExamId, commentaryOpen, renderCard) {
    if (!exams || exams.length === 0) {
        return `
            <section id="past-exams" class="fade-in">
                <div class="section-header">
                    <h2>過去の試験問題</h2>
                    <span class="decoration-line"></span>
                </div>
                <p class="empty-state">試験データはまだありません．</p>
            </section>
        `;
    }

    // 選択された試験、見つからなければ先頭の試験
    const selectedExam = exams.find(e => e.id === selectedExamId) || exams[0];

    const cardsHTML = renderCard(selectedExam, commentaryOpen.has(selectedExam.id));

    return `
        <section id="past-exams" class="fade-in">
            <div class="section-header">
                <h2>過去の試験問題</h2>
                <span class="decoration-line"></span>
            </div>
            ${exams.length > 1 ? `
                <div class="exam-selector-container">
                    <span class="exam-selector-label">試験を選択</span>
                    <div class="premium-dropdown" id="examDropdown">
                        <button type="button" 
                                class="dropdown-trigger" 
                                data-action="toggle-dropdown" 
                                aria-haspopup="listbox" 
                                aria-expanded="false">
                            <div class="trigger-content">
                                <span class="trigger-number">${selectedExam.number || ''}</span>
                                <span class="trigger-title">${selectedExam.title}</span>
                            </div>
                            <i class="fa-solid fa-chevron-down chevron"></i>
                        </button>
                        <ul class="dropdown-menu" role="listbox">
                            ${exams.map(exam => `
                                <li class="dropdown-item ${exam.id === selectedExam.id ? 'selected' : ''}" 
                                    role="option" 
                                    data-action="change-exam" 
                                    data-value="${exam.id}"
                                    aria-selected="${exam.id === selectedExam.id}">
                                    <span class="item-number">${exam.number || ''}</span>
                                    <span class="item-title">${exam.title}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            ` : ''}
            <div class="exam-list">
                ${cardsHTML}
            </div>
        </section>
    `;
}
