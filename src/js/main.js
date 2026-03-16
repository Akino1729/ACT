import { AppController } from './app/AppController.js';
import { state, getLatestExamId } from './app/state.js';
import { ParticleIntro } from './intro.js';
import { initScrollEffects } from './utils/scroll.js';

// アプリケーションを起動
document.addEventListener('DOMContentLoaded', () => {
    // イントロアニメーションの初期化
    new ParticleIntro();

    // スクロールエフェクト（パララックス等）の初期化
    initScrollEffects();

    // 初回選択を最新の試験に初期化
    state.selectedExamId = getLatestExamId();
    new AppController();
});
