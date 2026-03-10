/**
 * 実施中試験セクション
 * @param {object|null} upcoming - 実施中試験データ
 * @returns {string} HTML文字列
 */
export function UpcomingSection(upcoming) {
    // 試験データがない場合は空状態を表示
    let upcomingHTML = `<p class="empty-state">現在，実施中の試験はありません．</p>`;

    if (upcoming && upcoming.exists) {
        const pdfAvailable = upcoming.pdfLink && upcoming.pdfLink !== '#';
        const formAvailable = upcoming.formLink && upcoming.formLink !== '#';

        upcomingHTML = `
            <div class="upcoming-card">
                <div class="upcoming-content">
                    <span class="upcoming-label">NEXT EXAMINATION</span>
                    ${upcoming.number ? `<div class="exam-number-text">${upcoming.number}</div>` : ''}
                    <h3 class="upcoming-title">${upcoming.title}</h3>
                    <div class="upcoming-date-box">
                        <span class="date-main">${upcoming.date}</span>
                        <span class="date-sub">${upcoming.schedule}</span>
                    </div>

                    <!-- カウントダウンタイマー -->
                    <div class="countdown-wrapper">
                        <span class="countdown-label">試験開始まで</span>
                        <div class="countdown-timer" id="countdown-timer">
                            <!-- タイマーは JS で注入される -->
                        </div>
                    </div>

                    <div class="upcoming-links">
                        ${pdfAvailable
                            ? `<a href="${upcoming.pdfLink}" target="_blank" class="upcoming-link">
                                <i class="fa-regular fa-file-pdf"></i> 問題用紙
                               </a>`
                            : `<span class="upcoming-link disabled">
                                <i class="fa-regular fa-file-pdf"></i> 問題用紙
                               </span>
                               <span class="upcoming-link-note">※試験開始時に配布されます</span>`
                        }
                        ${formAvailable
                            ? `<a href="${upcoming.formLink}" target="_blank" class="upcoming-link">
                                <i class="fa-brands fa-google"></i> 解答はこちら
                               </a>`
                            : `<span class="upcoming-link disabled">
                                <i class="fa-brands fa-google"></i> 解答フォーム
                               </span>
                               <span class="upcoming-link-note">※試験開始時に公開されます</span>`
                        }
                    </div>
                </div>
            </div>
        `;
    }

    return `
        <section id="ongoing" class="fade-in">
            <div class="section-header">
                <h2>実施中の試験</h2>
                <span class="decoration-line"></span>
            </div>
            ${upcomingHTML}
        </section>
    `;
}
