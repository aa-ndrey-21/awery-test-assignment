<?php

arch('resources are in the Resources namespace and end with Resource')
    ->expect('App\Http\Resources')
    ->toHaveSuffix('Resource')
    ->toExtend('Illuminate\Http\Resources\Json\JsonResource');

arch('controllers are in the Controllers namespace and end with Controller')
    ->expect('App\Http\Controllers')
    ->toHaveSuffix('Controller');

arch('models are in the Models namespace and extend Model')
    ->expect('App\Models')
    ->toExtend('Illuminate\Database\Eloquent\Model');
