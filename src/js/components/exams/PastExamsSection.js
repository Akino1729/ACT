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

    const examOptions = exams.map((exam) =>
        `<option value="${exam.id}" ${exam.id === selectedExam.id ? 'selected' : ''}>${exam.number ? exam.number + ' ' : ''}${exam.title}</option>`
    ).join('');

    const cardsHTML = renderCard(selectedExam, commentaryOpen.has(selectedExam.id));

    return `
        <section id="past-exams" class="fade-in">
            <div class="section-header">
                <h2>過去の試験問題</h2>
                <span class="decoration-line"></span>
            </div>
            ${exams.length > 1 ? `
                <div class="year-selector-wrapper">
                    <label for="exam-select" class="year-selector-label">試験を選択:</label>
                    <select id="exam-select"
                            class="year-select"
                            data-action="change-exam"
                            aria-label="表示する試験を選択">
                        ${examOptions}
                    </select>
                </div>
            ` : ''}
            <div class="exam-list">
                ${cardsHTML}
            </div>
        </section>
    `;
}
