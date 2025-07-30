<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Movement extends Model
{
    //
    protected $fillable = ['description', 'amount', 'date', 'type', 'category_id'];

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
