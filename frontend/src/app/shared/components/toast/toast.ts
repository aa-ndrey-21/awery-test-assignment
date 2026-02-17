import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-lg"
          [class]="toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'"
        >
          <span>{{ toast.message }}</span>
          <button
            class="cursor-pointer text-white/80 hover:text-white"
            (click)="toastService.dismiss(toast.id)"
          >
            &times;
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  toastService = inject(ToastService);
}
