<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TacheController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProjetController;

Route::get('/login', [AuthController::class, 'login'])->withoutMiddleware('auth');
Route::get('/taches', [TacheController::class, 'index']);
Route::post('/taches', [TacheController::class, 'store']);
Route::put('/taches/{id}', [TacheController::class, 'update']);
Route::delete('/taches/{id}', [TacheController::class, 'destroy']);



Route::get('/projets', [ProjetController::class, 'index']);
Route::get('/projets/{id}', [ProjetController::class, 'show']);
Route::post('/projets', [ProjetController::class, 'store']);
Route::put('/projets/{id}', [ProjetController::class, 'update']);
Route::delete('/projets/{id}', [ProjetController::class, 'destroy']);
Route::get('/clients/{clientId}/projets', [ProjetController::class, 'getProjetsByClient']);
Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});



Route::get('/clients/{id}', [ClientController::class, 'show'])->name('clients.show');
Route::put('/clients/{id}', [ClientController::class, 'update'])->name('clients.update');

Route::get('/clients', [ClientController::class, 'index']);
