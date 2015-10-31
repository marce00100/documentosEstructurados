<?php

namespace App;

use Jenssegers\Mongodb\Model as Moloquent;
//use Illuminate\Database\Eloquent\Model;

class MongoJensModel extends Moloquent
{
//    protected $connection = 'mongodb';
    protected $collection = 'usuarios';
}
