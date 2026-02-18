import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NewsService } from '../../core/services/news.service';
import { News } from '../../core/models/news.model';
import { NewsCardComponent } from '../../shared/components/news-card/news-card';
import { PaginationComponent } from '../../shared/components/pagination/pagination';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  imports: [NewsCardComponent, PaginationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private newsService = inject(NewsService);

  newsList = signal<News[]>([]);
  currentPage = signal(1);
  lastPage = signal(1);
  loading = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.loadNews(1);
  }

  loadNews(page: number): void {
    this.loading.set(true);
    this.error.set('');
    this.newsService.getAll(page).subscribe({
      next: (res) => {
        this.newsList.set(res.data);
        this.currentPage.set(res.meta.current_page);
        this.lastPage.set(res.meta.last_page);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to load news. Please try again.');
      },
    });
  }
}
