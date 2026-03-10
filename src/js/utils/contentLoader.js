import { contentPages } from '../data/contentMap.js';

/**
 * 指定されたページ名のHTMLコンテンツを非同期で取得する．
 * @param {string} pageName 取得するページの名前 (e.g. 'guidelines')
 * @returns {Promise<string>} 取得したHTML文字列．見つからない場合はエラーメッセージHTML．
 */
export async function loadContent(pageName) {
    const url = contentPages[pageName];
    if (!url) {
        return `<p class="error-msg">ページが見つかりません: ${pageName}</p>`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (e) {
        console.error(`[contentLoader] Failed to load ${pageName} from ${url}:`, e);
        return `<p class="error-msg">コンテンツの読み込みに失敗しました．ネットワーク接続を確認してください．</p>`;
    }
}
