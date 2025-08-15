<?php

namespace App\Observers;

use Illuminate\Database\Eloquent\Model;

class UserTenantObserver
{
    public function creating(Model $model)
    {
        $model->user_id = auth()->user()->id;
    }
}
