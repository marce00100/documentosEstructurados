<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\DocumentosModel as Documentos;

class DocumentosController extends Controller
{

    public function obtenerDocumentos()
    {
        $camposMostrados = [
            '_id', 'nombre', 'descripcion', 'plantilla_nombre',
            'usuario_creacion', 'usuario_modificacion',
            'fecha_creacion', 'fecha_modificacion',
        ];
        $documentos = Documentos::orderBy('fecha_creacion', 'DESC')->get($camposMostrados);
        return response()->json([
                "mensaje" => "Encontrados " . $documentos->count(),
                "documentos" => $documentos->toArray(),
                ], 200);
    }

    public function obtenerDocumento($id)
    {
        $documento = Documentos::find($id);
        return response()->json([
                "mensaje" => "Encontrado",
                "documento" => $documento->toArray(),
                ], 200);
    }

    public function crear(Request $request)
    {
        $request->usuario_creacion = "000100010001000010000001";
        $documento = new Documentos();
        $documento->nombre = (string) $request->nombre;
        $documento->descripcion = (string) $request->descripcion;
        $documento->plantilla_id = (string) $request->plantilla_id;
        $documento->plantilla_nombre = (string) $request->plantilla_nombre;
        $documento->plantilla_contenido = (string) $request->plantilla_contenido;
        $documento->contenido = $request->contenido;
        $documento->usuario_creacion = $request->usuario_creacion;
        $documento->usuario_modificacion = $request->usuario_creacion;
        $documento->save();

        return response()->json([
                "mensaje" => "Documento Creado",
                "documento" => $documento->toArray(),
                ], 201);
    }

    public function modificar($id, Request $request)
    {
        $request->usuario_modificacion = "000900090009000090000019";
        $documento = Documentos::find($id);
        $documento->nombre = (string) $request->nombre;
        $documento->descripcion = (string) $request->descripcion;
//        $documento->plantilla = (string) $request->plantilla;
//        $documento->plantilla_id = (string) $request->plantilla_id;
        $documento->contenido = $request->contenido;
        $documento->usuario_modificacion = $request->usuario_modificacion;
        $documento->save();

        return response()->json([
                "mensaje" => "Documento Modificadoa",
                "documento" => $documento->toArray(),
                ], 200);
    }

}
