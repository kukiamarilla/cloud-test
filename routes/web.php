<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/app');
});

Route::get('app/{any?}', function () {
    return view('app');
})->where('any', '.*');
