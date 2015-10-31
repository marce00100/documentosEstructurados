<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\MongoJensModel as Coleccion;
use DB;

class MongoJensController extends Controller
{

    public function obtener()
    {
        $datos = Coleccion::all();
        echo "************<br>";
        print_r($datos);
        foreach ($datos as $dato)
        {
            echo "<br> *************";
            var_dump($dato);
            echo "<br> *************";
        }
        echo "<br> ******cccccccccccccccccccccccccccccc*******";
        
        $test = DB::collection('usuarios')->where('estado', 'activo')->get();
        print_r($test);
        echo "<br> ******cccccccccccccccccccccccccccccc*******";
        echo "<br> ******cccccccccccccccccccccccccccccc*******";
        $test = Coleccion::where('estado', 'activo')->get();
        print_r($test);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

}
