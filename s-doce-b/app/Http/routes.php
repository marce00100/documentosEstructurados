<?php

/*
 * Rutas para Plantillas Maestras
 */
Route::get('/maestras/', 'MaestrasController@obtenerMaestras');
Route::get('/maestras/{id}', 'MaestrasController@obtenerMaestra');
Route::post('/maestras/', 'MaestrasController@crear');
Route::put('/maestras/{id}', 'MaestrasController@modificar');


/*
 * Rutas para Plantillas 
 */
Route::get('/plantillas/', 'PlantillasController@obtenerPlantillas');
Route::get('/plantillas/{id}', 'PlantillasController@obtenerPlantilla');
Route::post('/plantillas/', 'PlantillasController@crear');
Route::put('/plantillas/{id}', 'PlantillasController@modificar');


/*
 * Rutas para Plantillas 
 */
Route::get('/documentos/', 'DocumentosController@obtenerDocumentos');
Route::get('/documentos/{id}', 'DocumentosController@obtenerDocumento');
Route::post('/documentos/', 'DocumentosController@crear');
Route::put('/documentos/{id}', 'DocumentosController@modificar');



Route::get('/', function () {
    return view('welcome');
});

