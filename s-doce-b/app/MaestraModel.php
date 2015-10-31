<?php

namespace App;

use Jenssegers\Mongodb\Model as Moloquent;
//use Illuminate\Database\Eloquent\Model;

class MaestraModel extends Moloquent
{
//    protected $connection = 'mongodb';
    protected $collection = 'persona';
}