// Manual testing script for dateUtils
import { getCurrentDateInfo, getDaysInMonth } from './dateUtils';

// Test getCurrentDateInfo
console.log('--- getCurrentDateInfo test ---');
const currentDate = getCurrentDateInfo();
console.log('Current date info:', currentDate);
console.log('Expected month:', new Date().getMonth() + 1);
console.log('Expected day:', new Date().getDate());

// Test getDaysInMonth
console.log('\n--- getDaysInMonth test ---');

// Test current month
const { month, year = new Date().getFullYear() } = getCurrentDateInfo();
console.log(`Days in current month (${month}/${year}):`, getDaysInMonth(month, year));

// Test all months in current year
console.log('\nDays in all months of current year:');
for (let m = 1; m <= 12; m++) {
  console.log(`Month ${m}: ${getDaysInMonth(m, year)} days`);
}

// Test February in leap year and non-leap year
console.log('\nFebruary tests:');
console.log('Feb 2020 (leap year):', getDaysInMonth(2, 2020));
console.log('Feb 2023 (non-leap year):', getDaysInMonth(2, 2023));
console.log('Feb 2024 (leap year):', getDaysInMonth(2, 2024));

// Test error cases
console.log('\nError cases:');
try {
  getDaysInMonth(0, 2023);
} catch (e) {
  console.log('Month 0 error:', e.message);
}

try {
  getDaysInMonth(13, 2023);
} catch (e) {
  console.log('Month 13 error:', e.message);
}

try {
  getDaysInMonth(1, null);
} catch (e) {
  console.log('Null year error:', e.message);
}

console.log('\nAll tests complete!'); 