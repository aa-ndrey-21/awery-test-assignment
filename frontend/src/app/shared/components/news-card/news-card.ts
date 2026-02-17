import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { News } from '../../../core/models/news.model';

@Component({
  selector: 'app-news-card',
  standalone: true,
  templateUrl: './news-card.html',
  imports: [RouterLink, DatePipe],
  host: { class: 'block h-full' },
})
export class NewsCardComponent {
  news = input.required<News>();

  excerpt = computed(() => {
    const content = this.news().content;
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  });
}
