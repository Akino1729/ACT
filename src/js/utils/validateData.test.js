import { describe, it, expect } from 'vitest';
import { validateNews, validateExams } from './validateData.js';

describe('validateData', () => {
    describe('validateNews', () => {
        it('should return array with missing fields filled by defaults', () => {
            const malformedNews = [
                { text: 'Missing date' },
                { date: '2025/11/11' } // text missing
            ];
            const validated = validateNews(malformedNews);
            
            expect(validated[0].date).toBe('----.--.--');
            expect(validated[0].text).toBe('Missing date');
            expect(validated[1].date).toBe('2025/11/11');
            expect(validated[1].text).toBe('');
        });
    });

    describe('validateExams', () => {
        it('should return array with nested defaults for links and stats', () => {
            const malformedExams = [
                { id: '1', title: 'test exam' } // links, stats missing
            ];
            
            const validated = validateExams(malformedExams);
            
            expect(validated[0].id).toBe('1');
            expect(validated[0].title).toBe('test exam');
            expect(validated[0].links).toBeDefined();
            expect(validated[0].links.question).toBe('#');
            expect(validated[0].stats).toBeDefined();
            expect(validated[0].stats.takers).toBe(0);
        });
    });
});
