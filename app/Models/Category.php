<?php

namespace App\Models;

use App\Models\Scopes\UserTenantScope;
use App\Observers\UserTenantObserver;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'user_id'];

    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope(new UserTenantScope);
        static::observe(UserTenantObserver::class);
    }


    public function movements()
    {
        return $this->hasMany(Movement::class);
    }

    public function groupers()
    {
        return $this->belongsToMany(Grouper::class, 'category_grouper');
    }
}
