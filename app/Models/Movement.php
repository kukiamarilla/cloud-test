<?php

namespace App\Models;

use App\Models\Scopes\UserTenantScope;
use App\Observers\UserTenantObserver;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Movement extends Model
{
    protected $fillable = ['description', 'amount', 'date', 'type', 'category_id', 'user_id'];

    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope(new UserTenantScope);
        static::observe(UserTenantObserver::class);
    }

    protected static function booted()
    {
        static::creating(function ($model) {
            if (is_null($model->date)) {
                $model->date = Carbon::today();
            }
        });
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
