import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NewsService } from '../../core/services/news.service';
import { News } from '../../core/models/news.model';
import { ButtonDirective } from '../../shared/components/button/button';
import { ToastService } from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-news-form',
  standalone: true,
  templateUrl: './news-form.html',
  imports: [ReactiveFormsModule, RouterLink, ButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private newsService = inject(NewsService);
  private router = inject(Router);
  private toast = inject(ToastService);

  news = input<News>();
  saved = output<News>();

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  selectedFile: File | null = null;
  imagePreview: string | null = null;
  submitting = false;
  error = '';
  fieldErrors = signal<Record<string, string[]>>({});

  ngOnInit(): void {
    const existing = this.news();
    if (existing) {
      this.form.patchValue({
        title: existing.title,
        content: existing.content,
      });
      if (existing.image) {
        this.imagePreview = existing.image;
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.selectedFile = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    } else {
      this.imagePreview = this.news()?.image ?? null;
    }
  }

  onSubmit(): void {
    if (this.form.invalid || this.submitting) return;

    this.submitting = true;
    this.error = '';
    this.fieldErrors.set({});
    const { title, content } = this.form.getRawValue();
    const existing = this.news();

    const payload = { title, content, image: this.selectedFile };

    const request = existing
      ? this.newsService.update(existing.id, payload)
      : this.newsService.create(payload);

    request.subscribe({
      next: (res) => {
        this.submitting = false;
        if (existing) {
          this.saved.emit(res.data);
        } else {
          this.toast.success('News created successfully.');
          this.router.navigate(['/news', res.data.id]);
        }
      },
      error: (err) => {
        this.submitting = false;
        if (err.status === 422 && err.error?.errors) {
          this.fieldErrors.set(err.error.errors);
          this.error = err.error.message ?? 'Please fix the errors below.';
        } else {
          this.error = err.error?.message ?? 'Something went wrong.';
        }
      },
    });
  }

  getFieldError(field: string): string {
    return this.fieldErrors()[field]?.[0] ?? '';
  }
}
