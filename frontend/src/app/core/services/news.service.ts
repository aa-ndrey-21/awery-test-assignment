import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News, PaginatedNews } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);

  getAll(page = 1) {
    return this.http.get<PaginatedNews>('/api/news', { params: { page } });
  }

  getOne(id: number) {
    return this.http.get<{ data: News }>(`/api/news/${id}`);
  }

  create(data: { title: string; content: string; image?: File | null }) {
    const formData = this.buildFormData(data);
    return this.http.post<{ data: News }>('/api/news', formData);
  }

  update(id: number, data: { title: string; content: string; image?: File | null }) {
    const formData = this.buildFormData(data);
    formData.append('_method', 'PUT');
    return this.http.post<{ data: News }>(`/api/news/${id}`, formData);
  }

  delete(id: number) {
    return this.http.delete<{ message: string }>(`/api/news/${id}`);
  }

  private buildFormData(data: { title: string; content: string; image?: File | null }): FormData {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.image) {
      formData.append('image', data.image);
    }
    return formData;
  }
}
