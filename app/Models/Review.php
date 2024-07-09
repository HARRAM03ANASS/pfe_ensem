<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'movie_id', 'content'];

    public function user(){
        return $this->belongsTo('User'::class);
    }
    public function movie(){
        return $this->belongsTo('Movie'::class);
    }
    public function likes(){
        return $this->hasMany('Likes'::class);
    }
}
