import { AppController } from './app/AppController.js';
import { state, getLatestExamId } from './app/state.js';

// アプリケーションを起動
document.addEventListener('DOMContentLoaded', () => {
    // 初回選択を最新の試験に初期化
    state.selectedExamId = getLatestExamId();
    new AppController();
});
