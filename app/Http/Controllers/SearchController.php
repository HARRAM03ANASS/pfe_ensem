<?php
// app/Http/Controllers/SearchController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('req');

        $movies = Movie::where('title', 'LIKE', "%{$req}%")
            ->orWhere('description', 'LIKE', "%{$req}%")
            ->orWhere('director', 'LIKE', "%{$req}%")
            ->get();

        return response()->json($movies);
    }
}
