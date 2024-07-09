<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class userController extends Controller
{
    public function getUser(Request $request)
    {
        return response()->json(Auth::user());
    }
}
