import { Injectable } from '@angular/core';

/**
 * CalendarService provides utility methods for calendar-related operations,
 * such as generating days for a month, navigating between months, and checking date properties.
 */
@Injectable({
  providedIn: 'root', // Service is provided at the root level (singleton)
})
export class CalendarService {
  /**
   * Returns an array of Date objects representing all days to display in a calendar month view.
   * The array starts from the Monday of the first week containing the 1st of the month.
   * @param year - The year for the month
   * @param month - The month (0-based, 0 = January)
   * @returns Date[] - Array of Date objects for the calendar grid
   */
  getDaysInMonth(year: number, month: number): Date[] {
    const firstDayOfMonth = new Date(year, month, 1); // First day of the month

    // Calculate offset to start from Monday (0 = Sunday, 1 = Monday, ...)
    const firstDayOffset =
      firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

    // Adjust the first day to the previous Monday (or same day if already Monday)
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOffset);

    // Get the number of days in the target month
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const days: Date[] = [];

    // Fill the array with Date objects for each day to display in the calendar grid
    for (let i = 0; i < totalDaysInMonth + firstDayOffset; i++) {
      const day = new Date(firstDayOfMonth);
      day.setDate(firstDayOfMonth.getDate() + i);
      days.push(day);
    }
    return days;
  }

  /**
   * Calculates the year and month for the next month.
   * @param year - Current year
   * @param month - Current month (0-based)
   * @returns Object with newYear and newMonth
   */
  nextMonth(
    year: number,
    month: number
  ): { newYear: number; newMonth: number } {
    if (month === 11) {
      // If December, increment year and reset month to January
      return { newYear: year + 1, newMonth: 0 };
    } else {
      // Otherwise, increment month
      return { newYear: year, newMonth: month + 1 };
    }
  }

  /**
   * Calculates the year and month for the previous month.
   * @param year - Current year
   * @param month - Current month (0-based)
   * @returns Object with newYear and newMonth
   */
  previousMonth(
    year: number,
    month: number
  ): { newYear: number; newMonth: number } {
    if (month === 0) {
      // If January, decrement year and set month to December
      return { newYear: year - 1, newMonth: 11 };
    } else {
      // Otherwise, decrement month
      return { newYear: year, newMonth: month - 1 };
    }
  }

  /**
   * Checks if a given date is today.
   * @param date - Date to check
   * @returns true if the date is today, false otherwise
   */
  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() == today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  /**
   * Checks if a given date is in the past (before today, not including today).
   * @param date - Date to check
   * @returns true if the date is before today, false otherwise
   */
  isPast(date: Date): boolean {
    const today = new Date();
    const todayMidnight = new Date(today.setHours(0, 0, 0, 0)); // Today at midnight
    return date < todayMidnight;
  }
}
