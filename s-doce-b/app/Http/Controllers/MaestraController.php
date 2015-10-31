<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\MaestraModel as Maestra;
use DateTime;
use Carbon\Carbon;

class MaestraController extends Controller
{

    public function obtenerMaestras()
    {
        $camposMostrados = [
            '_id', 'nombre', 'descripcion', 'activa',
            //'cabecera', 'pie',
            'usuario_creacion', 'fecha_creacion',
            'usuario_modificacion', 'fecha_modificacion',
        ];
        $maestras = Maestra::orderBy('nombre')->get($camposMostrados);
        return response()->json([
                "mensaje" => "Encontrados",
                "plantillas_maestras" => $maestras->toArray(),
                ], 200);
    }

    public function obtenerMaestra($id)
    {
        $camposMostrados = [
            '_id', 'nombre', 'descripcion', 'activa', 'cabecera', 'pie',
            'usuario_creacion', 'fecha_creacion',
            'usuario_modificacion', 'fecha_modificacion',
        ];
        $maestra = Maestra::find($id);
        return response()->json([
                "mensaje" => "Encontrado",
                "plantilla_maestra" => $maestra->toArray(),
                ], 200);
    }

    public function crear(Request $request)
    {
        if ($request->activa)
        {
            $this->desactivarTodas();
        }

        $request->usuario_creacion = "000100010001000010000001";
        $maestra = new Maestra();
        $maestra->nombre = $request->nombre;
        $maestra->descripcion = (string) $request->descripcion;
        $maestra->activa = (int) $request->activa;
        $maestra->cabecera = (string) $request->cabecera;
        $maestra->pie = (string) $request->pie;
        $maestra->usuario_creacion = $request->usuario_creacion;
        $maestra->usuario_modificacion = $request->usuario_creacion;
        $maestra->save();

        return response()->json([
                "mensaje" => "Plantilla Maestra Creada",
                "plantilla_maestra" => $maestra->toArray(),
                ], 201);
    }

    public function modificar($id, Request $request)
    {
        if ($request->activa)
        {
            $this->desactivarTodas();
        }
        $request->usuario_modificacion = "000900090009000090000009";
        $maestra = Maestra::find($id);
        $maestra->nombre = (string) $request->nombre;
        $maestra->descripcion = (string) $request->descripcion;
        $maestra->activa = (int) $request->activa;
        $maestra->cabecera = (string) $request->cabecera;
        $maestra->pie = (string) $request->pie;
        $maestra->usuario_modificacion = $request->usuario_modificacion;
        $maestra->save();

        return response()->json([
                "mensaje" => "Plantilla Maestra Modificada",
                "plantilla_maestra" => $maestra->toArray(),
                ], 200);
    }

    private function desactivarTodas()
    {

        $maestras = Maestra::whereNull('activa')->orWhere('activa', '=', 1)->get(); 

        foreach ($maestras as $maestra)
        {
            $maestra->activa = 0;
            $maestra->save();
        }
    }

}
