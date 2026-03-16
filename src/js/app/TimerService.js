export class TimerService {
    constructor() {
        this.intervalId = null;
    }

    start(targetDate) {
        this.stop();
        const countdownElement = document.getElementById('countdown-timer');
        if (!countdownElement || !targetDate) return;

        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate - now;

            if (diff <= 0) {
                countdownElement.innerHTML = `<span class="countdown-ended">試験開始</span>`;
                this.stop();
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <div class="countdown-unit">
                    <span class="countdown-value">${String(days).padStart(2, '0')}</span>
                    <span class="countdown-text">日</span>
                </div>
                <span class="countdown-separator">:</span>
                <div class="countdown-unit">
                    <span class="countdown-value">${String(hours).padStart(2, '0')}</span>
                    <span class="countdown-text">時間</span>
                </div>
                <span class="countdown-separator">:</span>
                <div class="countdown-unit">
                    <span class="countdown-value">${String(minutes).padStart(2, '0')}</span>
                    <span class="countdown-text">分</span>
                </div>
                <span class="countdown-separator">:</span>
                <div class="countdown-unit">
                    <span class="countdown-value">${String(seconds).padStart(2, '0')}</span>
                    <span class="countdown-text">秒</span>
                </div>
            `;
        };

        updateCountdown();
        this.intervalId = setInterval(updateCountdown, 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
