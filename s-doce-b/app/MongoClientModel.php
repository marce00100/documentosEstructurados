<?php

namespace App;

use App\MongoClientBase as mongo;

class MongoClientModel
{

    public static function obtieneColeccion($bd, $nombreColeccion)
    {

        $instanciaBd = mongo::instancia($bd);
// select the collection
        $coleccion = $instanciaBd->$nombreColeccion;
// pull a cursor query
        $resultado = $coleccion->find();
        return $resultado;
    }

}
