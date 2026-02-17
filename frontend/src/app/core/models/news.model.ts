import { User } from './user.model';

export interface News {
  id: number;
  title: string;
  image: string;
  content: string;
  user: User;
  created_at: string;
}

export interface PaginatedNews {
  data: News[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
