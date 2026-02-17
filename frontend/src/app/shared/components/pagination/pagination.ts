import { Component, input, output } from '@angular/core';
import { ButtonDirective } from '../button/button';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.html',
  imports: [ButtonDirective],
})
export class PaginationComponent {
  currentPage = input.required<number>();
  lastPage = input.required<number>();
  pageChange = output<number>();
}
