<?php

/*
 * Rutas para Plantillas Maestras
 */
Route::get('/maestras/', 'MaestrasController@obtenerMaestras');
Route::get('/maestras/{id}', 'MaestrasController@obtenerMaestra');
Route::post('/maestras/', 'MaestrasController@crear');
Route::put('/maestras/{id}', 'MaestrasController@modificar');
// Para obtener la plantilla maestra activa
Route::get('/maestra/activa/', 'MaestrasController@obtenerMaestraActiva');



/*
 * Rutas para Plantillas Para los Servicios WEB: GET, GET(id), POST, PUT(id)
 */
Route::get('/plantillas/', 'PlantillasController@obtenerPlantillas');
Route::get('/plantillas/{id}', 'PlantillasController@obtenerPlantilla');
Route::post('/plantillas/', 'PlantillasController@crear');
Route::put('/plantillas/{id}', 'PlantillasController@modificar');
// Ruta para obtener servicios con criterio: Campo like Valor order by nombre ASC
Route::get('/plantillas/{campo}/{valor}', 'PlantillasController@obtenerPlantillasCriterio');





/*
 * Rutas para Documentos 
 */
Route::get('/documentos/', 'DocumentosController@obtenerDocumentos');
Route::get('/documentos/{id}', 'DocumentosController@obtenerDocumento');
Route::post('/documentos/', 'DocumentosController@crear');
Route::put('/documentos/{id}', 'DocumentosController@modificar');



Route::get('/', function () {
    return view('welcome');
});

