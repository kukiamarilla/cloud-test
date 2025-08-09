<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grouper extends Model
{
    protected $fillable = ['name'];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_grouper');
    }
}
