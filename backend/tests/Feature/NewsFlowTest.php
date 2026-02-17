<?php

use App\Models\News;
use App\Models\User;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);

    $this->admin = User::factory()->create()->assignRole('admin');
    $this->user = User::factory()->create()->assignRole('user');
});

it('allows admin to create, update, and delete news', function () {
    // Create
    $response = $this->actingAs($this->admin)->postJson('/api/news', [
        'title' => 'Test News',
        'content' => 'Test content for the news article.',
    ]);

    $response->assertCreated()
        ->assertJsonPath('data.title', 'Test News')
        ->assertJsonPath('data.content', 'Test content for the news article.')
        ->assertJsonPath('data.user.id', $this->admin->id);

    $newsId = $response->json('data.id');

    // Update
    $response = $this->actingAs($this->admin)->putJson("/api/news/{$newsId}", [
        'title' => 'Updated Title',
    ]);

    $response->assertOk()
        ->assertJsonPath('data.title', 'Updated Title')
        ->assertJsonPath('data.content', 'Test content for the news article.');

    // Delete
    $this->actingAs($this->admin)
        ->deleteJson("/api/news/{$newsId}")
        ->assertOk()
        ->assertJsonPath('message', 'Deleted');

    expect(News::find($newsId))->toBeNull();
});

it('allows any authenticated user to list and view news', function () {
    $news = News::create([
        'title' => 'Visible News',
        'content' => 'Content here.',
        'user_id' => $this->admin->id,
    ]);

    $this->actingAs($this->user)
        ->getJson('/api/news')
        ->assertOk()
        ->assertJsonPath('data.0.title', 'Visible News');

    $this->actingAs($this->user)
        ->getJson("/api/news/{$news->id}")
        ->assertOk()
        ->assertJsonPath('data.title', 'Visible News');
});

it('forbids regular user from creating news', function () {
    $this->actingAs($this->user)
        ->postJson('/api/news', [
            'title' => 'Nope',
            'content' => 'Should fail.',
        ])
        ->assertForbidden();
});

it('returns 401 for unauthenticated requests', function () {
    $this->getJson('/api/news')->assertUnauthorized();
});

it('validates required fields on create', function () {
    $this->actingAs($this->admin)
        ->postJson('/api/news', [])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['title', 'content']);
});
