<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\NewsResource;
use App\Models\News;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NewsController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $news = News::with('user')->latest()->paginate(15);

        return NewsResource::collection($news);
    }

    public function show(News $news): NewsResource
    {
        $news->load('user');

        return NewsResource::make($news);
    }

    public function store(StoreNewsRequest $request): NewsResource
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('news', 'public');
        }

        $news = News::create([
            ...$data,
            'user_id' => $request->user()->id,
        ]);

        $news->load('user');

        return NewsResource::make($news);
    }

    public function update(UpdateNewsRequest $request, News $news): NewsResource
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('news', 'public');
        }

        $news->update($data);
        $news->load('user');

        return NewsResource::make($news);
    }

    public function destroy(News $news): JsonResponse
    {
        $news->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
