<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\MovieDetailsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:sanctum')->get('/user', [userController::class, 'getUser']);

Route::get('/movies', [MovieController::class, 'index']);
Route::get('/movie/{id}', [MovieDetailsController::class, 'show']);
Route::get('/search/{term}/movies',[MovieController::class,'search']);
