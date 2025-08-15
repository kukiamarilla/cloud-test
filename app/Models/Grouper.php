<?php

namespace App\Models;

use App\Models\Scopes\UserTenantScope;
use App\Observers\UserTenantObserver;
use Illuminate\Database\Eloquent\Model;

class Grouper extends Model
{
    protected $fillable = ['name'];

    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope(new UserTenantScope);
        static::observe(UserTenantObserver::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_grouper');
    }
}
