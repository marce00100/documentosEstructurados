<?php

namespace App;

class MongoClientBase
{
    
    private static $instancia = null;
    public $bd;

    public function __construct()
    {
        $this->bd = self::instancia();
    }

    public static function instancia($bd)  //singleton 
    {
        if (self::$instancia == null || is_bool(self::$instancia))
        {
            $dbhost = 'localhost';
            $conexion = new \mongoClient("mongodb://$dbhost");
            $instanciaBd = $conexion->$bd;
            self::$instancia = $instanciaBd;
        }
        return self::$instancia;
    }
    
}
