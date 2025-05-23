// Import CommonModule for common Angular directives
import { CommonModule } from '@angular/common';
// Import Component and Input decorators from Angular core
import { Component, Input } from '@angular/core';
// Import CalendarService for date-related logic
import { CalendarService } from '../../services/calendar.service';

/**
 * DayCardComponent displays information for a single day in the calendar.
 * It highlights today, past days, and provides visual cues based on date logic.
 */
@Component({
  // Selector for using this component in templates
  selector: 'app-day-card',
  // Import CommonModule for template usage
  imports: [CommonModule],
  // Path to the component's HTML template
  templateUrl: './day-card.component.html',
  // Path to the component's SCSS styles
  styleUrl: './day-card.component.scss',
})
export class DayCardComponent {
  /**
   * The date this card represents. Passed in from parent component.
   */
  @Input() day!: Date;

  /**
   * Injects CalendarService for date comparison logic.
   */
  constructor(private calendarService: CalendarService) {}

  /**
   * Returns true if the represented day is today.
   */
  get isToday(): boolean {
    return this.calendarService.isToday(this.day);
  }

  /**
   * Returns true if the represented day is in the past.
   */
  get isPast(): boolean {
    return this.calendarService.isPast(this.day);
  }
}
