<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MovementController;
use App\Http\Controllers\GrouperController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('categories', CategoryController::class);
Route::apiResource('movements', MovementController::class);
Route::apiResource('groupers', GrouperController::class);
Route::get('/groupers/{id}/movements', [GrouperController::class, 'movements']);

// Ruta adicional para estadísticas de movimientos
Route::get('/movements/statistics', [MovementController::class, 'statistics']);