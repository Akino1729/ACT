import { exams, news, upcoming, qa } from '../data/index.js';
import { validateNews, validateExams, validateUpcoming, validateQA } from '../utils/validateData.js';

/**
 * Validated Application Data (Source of Truth)
 */
export const appData = {
    news: validateNews(news),
    exams: validateExams(exams),
    upcoming: validateUpcoming(upcoming),
    qa: validateQA(qa)
};

/**
 * アプリケーションのビューステート
 *
 * - selectedExamId: 現在選択されている試験のID（null の場合は最新）
 * - commentaryOpen: 開いているコメンタリーパネルの examId セット
 */
export const state = {
    /** @type {string|null} */
    selectedExamId: null,
    /** @type {Set<string>} */
    commentaryOpen: new Set(),
};

/**
 * 利用可能な試験から最新（先頭）の試験IDを取得する．
 * @returns {string|null}
 */
export function getLatestExamId() {
    if (!appData.exams || appData.exams.length === 0) return null;
    return appData.exams[0].id;
}

/**
 * コメンタリーの開閉状態を切り替える．
 * @param {string} examId
 */
export function toggleCommentary(examId) {
    if (state.commentaryOpen.has(examId)) {
        state.commentaryOpen.delete(examId);
    } else {
        state.commentaryOpen.add(examId);
    }
}
