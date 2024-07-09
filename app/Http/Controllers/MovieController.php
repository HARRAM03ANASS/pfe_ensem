<?php
namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index(Request $request)
    {
        $letter = $request->input('letter', null);

        if ($letter) {
            $movies = Movie::where('title', 'LIKE', "$letter%")->get();
        } else {
            $movies = Movie::inRandomOrder()->take(20)->get();

        }

        return response()->json($movies);
    }
    public function search($term,){
            $movies=Movie::where('title','LIKE',"%$term%")
            ->orWhere('description','LIKE',"$term%")
            ->get();
            return response()->json($movies);
    }
}
