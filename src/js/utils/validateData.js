/**
 * データバリデーションユーティリティ
 * 各データモジュールのフィールド存在チェックと，
 * 不足フィールドに対するフォールバック処理を提供する．
 */

/**
 * ニュースアイテムを検証し，不足フィールドをデフォルト値で補完して返す．
 * @param {Array} items
 * @returns {Array}
 */
export function validateNews(items) {
    if (!Array.isArray(items)) {
        console.warn('[validateData] news はリストである必要があります．空リストで初期化します．');
        return [];
    }
    return items.map((item, i) => {
        const base = { id: `news-${i}`, date: '----.--.--', isoDate: '', text: '' };
        if (!item.date) console.warn(`[validateData] news[${i}]: date フィールドがありません．`);
        if (!item.text) console.warn(`[validateData] news[${i}]: text フィールドがありません．`);
        return { ...base, ...item };
    });
}

/**
 * 試験アイテムを検証し，不足フィールドをデフォルト値で補完して返す．
 * @param {Array} items
 * @returns {Array}
 */
export function validateExams(items) {
    if (!Array.isArray(items)) {
        console.warn('[validateData] exams はリストである必要があります．空リストで初期化します．');
        return [];
    }
    return items.map((item, i) => {
        const base = {
            id: `exam-${i}`,
            number: '',
            title: '(タイトル未設定)',
            date: '----年--月--日',
            description: '',
            commentary: '',
            links: { question: '#', answer: '#', form: '#' },
            stats: { statsDate: '', takers: 0, average: 0, stdDev: 0, min: 0, median: 0, max: 0 },
        };
        if (!item.id) console.warn(`[validateData] exams[${i}]: id フィールドがありません．`);
        if (!item.title) console.warn(`[validateData] exams[${i}]: title フィールドがありません．`);
        if (!item.links) console.warn(`[validateData] exams[${i}]: links フィールドがありません．`);
        if (!item.stats) console.warn(`[validateData] exams[${i}]: stats フィールドがありません．`);
        return {
            ...base,
            ...item,
            links: { ...base.links, ...(item.links || {}) },
            stats: { ...base.stats, ...(item.stats || {}) },
        };
    });
}

/**
 * 実施中試験オブジェクトを検証する．
 * @param {object|null} upcoming
 * @returns {object|null}
 */
export function validateUpcoming(upcoming) {
    if (!upcoming) return null;
    if (!upcoming.title) console.warn('[validateData] upcoming: title フィールドがありません．');
    if (!upcoming.date) console.warn('[validateData] upcoming: date フィールドがありません．');
    if (!upcoming.examDateTime) console.warn('[validateData] upcoming: examDateTime フィールドがありません．');
    return upcoming;
}

/**
 * Q&A アイテムを検証し，不足フィールドをデフォルト値で補完して返す．
 * @param {Array} items
 * @returns {Array}
 */
export function validateQA(items) {
    if (!Array.isArray(items)) {
        console.warn('[validateData] qa はリストである必要があります．空リストで初期化します．');
        return [];
    }
    return items.map((item, i) => {
        const base = { q: '(質問未設定)', a: '(回答未設定)' };
        if (!item.q) console.warn(`[validateData] qa[${i}]: q フィールドがありません．`);
        if (!item.a) console.warn(`[validateData] qa[${i}]: a フィールドがありません．`);
        return { ...base, ...item };
    });
}
