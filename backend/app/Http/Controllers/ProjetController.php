<?php
namespace App\Http\Controllers;

use App\Models\Projet;
use Illuminate\Http\Request;

class ProjetController extends Controller
{
    public function index()
{
    $projets = Projet::with('client.utilisateur')->get(); 
    return response()->json($projets);
}

    public function show($id)
    {
        $projet = Projet::with('client.utilisateur')->find($id); 
        if (!$projet) {
            return response()->json(['error' => 'Projet non trouvé'], 404);
        }
        return response()->json($projet);
    }

    // Ajouter un projet
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'dateDebut' => 'required|date',
            'dateFin' => 'nullable|date',
            'statut' => 'required|in:a faire,en cours,fini',
            'client_id' => 'required|exists:clients,id'
        ]);

        $projet = Projet::create($request->all());
        return response()->json($projet, 201);
    }

    // Mettre à jour un projet
    public function update(Request $request, $id)
    {
        $projet = Projet::find($id);
        if (!$projet) {
            return response()->json(['error' => 'Projet non trouvé'], 404);
        }

        $request->validate([
            'nom' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'dateDebut' => 'sometimes|date',
            'dateFin' => 'sometimes|date',
            'statut' => 'sometimes|in:a faire,en cours,fini',
            'client_id' => 'sometimes|exists:clients,id'
        ]);

        $projet->update($request->all());
        return response()->json($projet);
    }

    // Supprimer un projet
    public function destroy($id)
    {
        $projet = Projet::find($id);
        if (!$projet) {
            return response()->json(['error' => 'Projet non trouvé'], 404);
        }

        $projet->delete();
        return response()->json(['message' => 'Projet supprimé']);
    }
}

