import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../shared/components/toast/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 0) {
        toast.error('Network error. Check your internet connection.');
      } else if (error.status >= 500) {
        toast.error('Server error. Please try again later.');
      }
      return throwError(() => error);
    }),
  );
};
