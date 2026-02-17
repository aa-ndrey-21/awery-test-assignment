import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { NewsService } from '../../core/services/news.service';
import { News } from '../../core/models/news.model';
import { NewsFormComponent } from '../news-form/news-form';
import { ButtonDirective } from '../../shared/components/button/button';
import { ToastService } from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.html',
  imports: [RouterLink, DatePipe, NewsFormComponent, ButtonDirective],
})
export class NewsDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private newsService = inject(NewsService);
  private toast = inject(ToastService);

  news = signal<News | null>(null);
  loading = signal(true);
  editing = signal(false);
  error = signal('');
  isAdmin = computed(() => this.authService.currentUser()?.role === 'admin');

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.newsService.getOne(id).subscribe({
      next: (res) => {
        this.news.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.status === 404 ? 'News article not found.' : 'Failed to load article.');
      },
    });
  }

  onUpdated(updated: News): void {
    this.news.set(updated);
    this.editing.set(false);
    this.toast.success('News updated successfully.');
  }

  onDelete(): void {
    const news = this.news();
    if (!news || !confirm('Are you sure you want to delete this news?')) return;

    this.newsService.delete(news.id).subscribe({
      next: () => {
        this.toast.success('News deleted.');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.toast.error('Failed to delete news. Please try again.');
      },
    });
  }
}
