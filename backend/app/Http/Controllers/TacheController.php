<?php

namespace App\Http\Controllers;

use App\Models\Tache;
use App\Models\Projet;
use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TacheController extends Controller
{
    /**
     * Récupérer toutes les tâches.
     */
    public function index()
    {
        $taches = Tache::with(['projet', 'user'])->get();
        return response()->json($taches);
    }

    /**
     * Récupérer une tâche spécifique.
     */
    public function show($id)
    {
        $tache = Tache::with(['projet', 'user'])->find($id);
        if (!$tache) {
            return response()->json(['error' => 'Tâche non trouvée'], 404);
        }
        return response()->json($tache);
    }

    /**
     * Créer une nouvelle tâche.
     */
    public function store(Request $request)
{
    $request->validate([
        'nom' => 'required|string|max:255',
        'statut' => ['required', Rule::in(StatutTache::valeurs())],
        'dateDebut' => 'required|date',
        'dateFin' => 'required|date|after_or_equal:dateDebut',
        'priorite' => ['required', Rule::in(PrioriteTache::valeurs())],
        'project_id' => 'required|exists:projets,id',
        'user_id' => 'required|exists:utilisateurs,id',
    ]);

    $tache = Tache::create([
        'nom' => $request->nom,
        'statut' => $request->statut,
        'dateDebut' => $request->dateDebut,
        'dateFin' => $request->dateFin,
        'priorite' => $request->priorite,
        'project_id' => $request->project_id,
        'user_id' => $request->user_id,
    ]);

    return response()->json($tache, 201);
}

    /**
     * Mettre à jour une tâche existante.
     */
    public function update(Request $request, $id)
    {
        $tache = Tache::find($id);
        if (!$tache) {
            return response()->json(['error' => 'Tâche non trouvée'], 404);
        }

        $validatedData = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'statut' => ['sometimes', Rule::in(['en attente', 'en cours', 'terminee', 'annulee'])],
            'dateDebut' => 'sometimes|date',
            'dateFin' => 'sometimes|date|after_or_equal:dateDebut',
            'priorite' => ['sometimes', Rule::in(['basse', 'moyenne', 'haute', 'critique'])],
            'project_id' => 'sometimes|exists:projets,id',
            'user_id' => 'sometimes|exists:utilisateurs,id',
        ]);

        $tache->update($validatedData);
        return response()->json($tache);
    }

    /**
     * Supprimer une tâche.
     */
    public function destroy($id)
    {
        $tache = Tache::find($id);
        if (!$tache) {
            return response()->json(['error' => 'Tâche non trouvée'], 404);
        }

        $tache->delete();
        return response()->json(['message' => 'Tâche supprimée avec succès']);
    }
}


