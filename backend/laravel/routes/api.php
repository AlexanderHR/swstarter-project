<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PeopleController;

Route::get('/ping', function () {
    return response()->json(['message' => 'API OK']);
});

Route::get('/people', [PeopleController::class, 'index']);
Route::get('/people/{id}', [PeopleController::class, 'show']);