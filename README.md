# News App

Full-stack news management application built with Laravel 12 and Angular 21.

## Quick Start

```bash
git clone https://github.com/aa-ndrey-21/awery-test-assignment.git
cd awery-test-assignment

# Configure environment
cp backend/.env.example backend/.env

# Start containers
docker compose up --build -d

# One-time setup
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan storage:link
docker compose exec app php artisan migrate --seed
```

Next time just `docker compose up -d`.

### Test Accounts

| Role  | Email            | Password |
|-------|------------------|----------|
| Admin | admin@test.com   | password |
| User  | user@test.com    | password |

## Backend Features

- **Authentication**: session-based login/logout via Laravel Sanctum with CSRF protection
- **Role-based access control**: admin and user roles via Spatie Laravel Permission
- **News CRUD API**: full REST API for news articles (create, read, update, delete)
- **Image uploads**: news articles support image attachments stored in public storage
- **Validation**: request validation with field-level error responses (422)
- **Standardized error handling**: consistent JSON responses for 401, 403, 404, and 500 errors
- **Static analysis**: PHPStan for type safety
- **Code style**: Laravel Pint for consistent formatting
- **Testing**: Pest framework with unit, integration, and architecture tests

### API Endpoints

| Method | Endpoint         | Auth     | Description          |
|--------|------------------|----------|----------------------|
| POST   | /api/login       | No       | Login                |
| POST   | /api/logout      | Yes      | Logout               |
| GET    | /api/user        | Yes      | Current user info    |
| GET    | /api/news        | Yes      | List news (paginated)|
| GET    | /api/news/{id}   | Yes      | View single news     |
| POST   | /api/news        | Admin    | Create news          |
| PUT    | /api/news/{id}   | Admin    | Update news          |
| DELETE | /api/news/{id}   | Admin    | Delete news          |

## Frontend Features

- **Dashboard**: paginated news grid with card layout
- **News detail page**: full article view with edit/delete for admins
- **News form**: create and edit news with image preview and field-level validation errors
- **Login page**: session-based authentication with error feedback
- **Responsive sidebar**: collapsible navigation with role-based menu items
- **Reusable components**: shared ButtonDirective, NewsCardComponent, PaginationComponent, ToastComponent
- **Error handling**: global HTTP error interceptor, toast notifications for transient errors, distinct error/empty states
- **Code quality**: ESLint with Angular and accessibility rules, Prettier with Tailwind CSS class sorting

## Pre-commit Hooks

Automated checks on every commit via Husky:
- **Frontend**: lint-staged (ESLint + Prettier) and TypeScript type-check
- **Backend**: PHPStan + Pest tests (via Docker)

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Backend  | PHP 8.4, Laravel 12, Sanctum, Spatie Permission |
| Frontend | Angular 21, Tailwind CSS 4, TypeScript 5.9      |
| Testing  | Pest 4, Vitest, PHPStan                         |
| Infra    | Docker, Nginx, MySQL 9, Redis                   |
