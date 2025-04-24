import { getCurrentDateInfo, getDaysInMonth } from './dateUtils';

// Test getCurrentDateInfo
describe('getCurrentDateInfo', () => {
  test('returns valid month and day', () => {
    const { month, day } = getCurrentDateInfo();
    
    // Month should be between 1-12
    expect(month).toBeGreaterThanOrEqual(1);
    expect(month).toBeLessThanOrEqual(12);
    
    // Day should be between 1-31
    expect(day).toBeGreaterThanOrEqual(1);
    expect(day).toBeLessThanOrEqual(31);
  });
  
  test('matches JavaScript Date object values', () => {
    const { month, day } = getCurrentDateInfo();
    const now = new Date();
    
    expect(month).toBe(now.getMonth() + 1);
    expect(day).toBe(now.getDate());
  });
});

// Test getDaysInMonth
describe('getDaysInMonth', () => {
  test('returns 31 days for January', () => {
    expect(getDaysInMonth(1, 2023)).toBe(31);
  });
  
  test('returns 30 days for April', () => {
    expect(getDaysInMonth(4, 2023)).toBe(30);
  });
  
  test('returns 28 days for February in non-leap year', () => {
    expect(getDaysInMonth(2, 2023)).toBe(28);
  });
  
  test('returns 29 days for February in leap year', () => {
    expect(getDaysInMonth(2, 2020)).toBe(29);
    expect(getDaysInMonth(2, 2024)).toBe(29);
  });
  
  test('handles all months correctly', () => {
    const daysIn2023 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    for (let month = 1; month <= 12; month++) {
      expect(getDaysInMonth(month, 2023)).toBe(daysIn2023[month - 1]);
    }
  });
  
  test('throws error for invalid month values', () => {
    expect(() => getDaysInMonth(0, 2023)).toThrow();
    expect(() => getDaysInMonth(13, 2023)).toThrow();
    expect(() => getDaysInMonth(-1, 2023)).toThrow();
    expect(() => getDaysInMonth(1.5, 2023)).toThrow();
  });
  
  test('throws error for invalid year values', () => {
    expect(() => getDaysInMonth(1, null)).toThrow();
    expect(() => getDaysInMonth(1, undefined)).toThrow();
    expect(() => getDaysInMonth(1, 'year')).toThrow();
    expect(() => getDaysInMonth(1, 2023.5)).toThrow();
  });
}); 