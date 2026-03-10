import { describe, it, expect } from 'vitest';
import { validateNews, validateExams } from './validateData.js';

describe('validateData', () => {
    describe('validateNews', () => {
        it('should correctly format items with missing fields', () => {
            const malformedNews = [
                { text: 'Missing date' },
                { date: '2025/11/11' } // text missing
            ];
            validateNews(malformedNews);
            
            expect(malformedNews[0].date).toBe('不明な日時');
            expect(malformedNews[1].text).toBe('タイトルなし');
        });
    });

    describe('validateExams', () => {
        it('should add currentYear to exams missing it', () => {
            const malformedExams = [
                { id: '1', title: 'test exam', links: {}, stats: {} }
            ];
            const currentYear = new Date().getFullYear();
            
            validateExams(malformedExams);
            
            expect(malformedExams[0].year).toBe(currentYear);
        });
    });
});
