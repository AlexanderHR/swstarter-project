<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PeopleController;
use App\Http\Controllers\Api\FilmsController;
use App\Http\Controllers\Api\StarWarsController;
use App\Http\Controllers\MetricsController;

Route::get('/ping', function () {
    return response()->json(['message' => 'API OK']);
});

Route::get('/metrics', [MetricsController::class, 'index']);

Route::prefix('/swapi')->middleware('throttle:swapi')->group(function () {
    Route::get('/people', [PeopleController::class, 'index']);
    Route::get('/people/{id}', [PeopleController::class, 'show']);
    Route::get('/films', [FilmsController::class, 'index']);
    Route::get('/films/{id}', [FilmsController::class, 'show']);
    Route::get('/related-entities', [StarWarsController::class, 'relatedEntities']);
});
