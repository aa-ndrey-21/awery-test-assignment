<?php

use App\Models\News;

it('has fillable attributes', function () {
    $news = new News();

    expect($news->getFillable())->toBe([
        'title',
        'image',
        'content',
        'user_id',
    ]);
});

it('has a user relationship method', function () {
    expect(method_exists(News::class, 'user'))->toBeTrue();
});
