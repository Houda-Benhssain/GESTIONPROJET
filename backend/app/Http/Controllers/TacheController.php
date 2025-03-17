<?php

namespace App\Http\Controllers;

use App\Models\Tache;
use Illuminate\Http\Request;

class TacheController extends Controller
{
    public function index()
    {
        $taches = Tache::with(['projet', 'user'])->get();
        return response()->json($taches);
    }

    public function show($id)
    {
        $tache = Tache::with(['projet', 'user'])->find($id);
        if (!$tache) {
            return response()->json(['error' => 'Tâche non trouvée'], 404);
        }
        return response()->json($tache);
    }
}

