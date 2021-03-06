<?php

namespace App\Models;

use Jenssegers\Mongodb\Model as Moloquent;

//use Illuminate\Database\Eloquent\Model;

class PlantillasModel extends Moloquent
{

//    protected $connection = 'mongodb';
    protected $collection = 'plantilla';
 

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    //protected $fillable = ['nombre', 'apellido', 'cargo', 'ci', 'ciudad'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * The name of the "created at" column.
     *
     * @var string
     */
    const CREATED_AT = 'fecha_creacion';

    /**
     * The name of the "updated at" column.
     *
     * @var string
     */
    const UPDATED_AT = 'fecha_modificacion';
    
    

}
