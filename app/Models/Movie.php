<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;
    
    protected $fillable=[
        'api_id',
        'title',
        'description',
        'release_date',
        'poster_path',
        'backdrop_path',
        'runtime',
        'tagline',
        'director',
        'genre',
        'cast',
    ];

    public function reviews(){
        return $this->hasMany('Review'::class);
    }
    public function ratings(){
        return $this->hasMany('Rating'::class);
    }
    public function usersWhoWatchListed(){
        return $this->belongsToMany('User'::class,'watchlists')->withTimestamps();
    }
    public function usersWhoWatched(){
        return $this->belongsToMany('User'::class,'watcheds')->withTimestamps();
    }
}
