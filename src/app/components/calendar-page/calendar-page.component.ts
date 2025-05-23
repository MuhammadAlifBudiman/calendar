// calendar-page.component.ts
// This component represents the main calendar page, displaying a month view and navigation controls.

import { CommonModule } from '@angular/common'; // Angular common directives
import { Component, OnInit } from '@angular/core'; // Angular core component and lifecycle hook
import { DayCardComponent } from '../day-card/day-card.component'; // Custom component for displaying a single day
import { CalendarService } from '../../services/calendar.service'; // Service for calendar logic

/**
 * CalendarPageComponent
 *
 * Displays a calendar month view with navigation for previous/next months.
 * Uses CalendarService to generate days and handle month navigation.
 */
@Component({
  selector: 'app-calendar-page', // Selector for this component
  imports: [CommonModule, DayCardComponent], // Modules/components used in this component
  templateUrl: './calendar-page.component.html', // HTML template
  styleUrl: './calendar-page.component.scss', // Stylesheet
})
export class CalendarPageComponent implements OnInit {
  /**
   * Array of Date objects representing each day in the current month view.
   */
  days: Date[] = [];
  /**
   * The currently displayed month (0 = January, 11 = December).
   */
  currentMonth: number = new Date().getMonth();
  /**
   * The currently displayed year (e.g., 2025).
   */
  currentYear: number = new Date().getFullYear();

  /**
   * Injects the CalendarService for date calculations.
   */
  constructor(private calendarService: CalendarService) {}

  /**
   * Loads all days for a given month and year into the days array.
   * @param year The year to load
   * @param month The month to load (0-based)
   */
  loadMonth(year: number, month: number) {
    this.days = this.calendarService.getDaysInMonth(year, month);
  }

  /**
   * Angular lifecycle hook: initializes the calendar with the current month.
   */
  ngOnInit() {
    this.loadMonth(this.currentYear, this.currentMonth);
  }

  /**
   * Advances the calendar to the next month, updating year if needed.
   */
  nextMonth() {
    const { newYear, newMonth } = this.calendarService.nextMonth(
      this.currentYear,
      this.currentMonth
    );
    this.currentYear = newYear;
    this.currentMonth = newMonth;
    this.loadMonth(this.currentYear, this.currentMonth);
  }

  /**
   * Moves the calendar to the previous month, updating year if needed.
   */
  previousMonth() {
    const { newYear, newMonth } = this.calendarService.previousMonth(
      this.currentYear,
      this.currentMonth
    );
    this.currentYear = newYear;
    this.currentMonth = newMonth;
    this.loadMonth(this.currentYear, this.currentMonth);
  }

  /**
   * Returns a string with the current month and year (e.g., "May 2025").
   */
  getMonthAndYear(): string {
    const date = new Date(this.currentYear, this.currentMonth, 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
}
