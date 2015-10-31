<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\PlantillasModel as Plantillas;


class PlantillasController extends Controller
{

    public function obtenerPlantillas()
    {
        $camposMostrados = [
            '_id', 'nombre', 'descripcion', 'vigente',
            'usuario_creacion', 'usuario_modificacion',
            'fecha_creacion', 'fecha_modificacion',
        ];
        $plantillas = Plantillas::orderBy('fecha_creacion', 'DESC')->get($camposMostrados);
        return response()->json([
                "mensaje" => "Encontrados",
                "plantillas" => $plantillas->toArray(),
                ], 200);
    }

    public function obtenerPlantilla($id)
    {


        $plantilla = Plantillas::find($id);
        return response()->json([
                "mensaje" => "Encontrado",
                "plantilla" => $plantilla->toArray(),
                ], 200);
    }

    public function crear(Request $request)
    {
        $request->usuario_creacion = "000100010001000010000001";
        $plantilla = new Plantillas();
        $plantilla->nombre = $request->nombre;
        $plantilla->descripcion = (string) $request->descripcion;
        $plantilla->vigente = (int) $request->vigente;
        $plantilla->contenido = (string) $request->contenido;
        $plantilla->usuario_creacion = $request->usuario_creacion;
        $plantilla->usuario_modificacion = $request->usuario_creacion;
        $plantilla->save();

        return response()->json([
                "mensaje" => "Plantilla Creada",
                "plantilla" => $plantilla->toArray(),
                ], 201);
    }

    public function modificar($id, Request $request)
    {

        $request->usuario_modificacion = "000900090009000090000019";
        $plantilla = Plantillas::find($id);
        $plantilla->nombre = (string) $request->nombre;
        $plantilla->descripcion = (string) $request->descripcion;
        $plantilla->vigente = (int) $request->vigente;
        $plantilla->contenido = (string) $request->contenido;
        $plantilla->usuario_modificacion = $request->usuario_modificacion;
        $plantilla->save();

        return response()->json([
                "mensaje" => "Plantilla Modificada",
                "plantilla" => $plantilla->toArray(),
                ], 200);
    }

}
