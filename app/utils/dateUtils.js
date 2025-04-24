/**
 * Returns an object with the current month and day
 * @returns {{month: number, day: number}} Object containing current month (1-12) and day (1-31)
 */
export function getCurrentDateInfo() {
  const now = new Date();
  return {
    month: now.getMonth() + 1, // getMonth() returns 0-11, so add 1
    day: now.getDate()
  };
}

/**
 * Gets the number of days in a specific month and year
 * @param {number} month - Month (1-12)
 * @param {number} year - Four-digit year
 * @returns {number} Number of days in the specified month
 * @throws {Error} If month is not between 1 and 12
 */
export function getDaysInMonth(month, year) {
  // Validate inputs
  if (month < 1 || month > 12 || !Number.isInteger(month)) {
    throw new Error("Month must be an integer between 1 and 12");
  }
  
  if (!year || !Number.isInteger(year)) {
    throw new Error("Year must be a valid integer");
  }
  
  // Using the Date object trick - day 0 of next month is the last day of current month
  // Month is 0-indexed in Date constructor, so we use the provided month directly
  return new Date(year, month, 0).getDate();
} 