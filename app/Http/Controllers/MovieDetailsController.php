<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieDetailsController extends Controller
{
    public function show($id)
    {
        $movie = Movie::where('api_id', $id)->first();

        if ($movie) {
            return response()->json($movie);
        } else {    
            return response()->json(['message' => 'Movie not found'], 404);
        }
    }
}
