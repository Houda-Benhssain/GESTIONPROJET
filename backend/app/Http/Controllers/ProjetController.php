<?php

namespace App\Http\Controllers;

use App\Models\Projet;
use App\Models\Client;  // Assure-toi d'inclure le modèle Client si nécessaire
use Illuminate\Http\Request;

class ProjetController extends Controller
{
    public function index()
{
    $projets = Projet::with('client.utilisateur', 'user','taches')->get();
    return response()->json($projets);
}

    


    public function show($id)
{
    $projet = Projet::with('client.utilisateur', 'user','taches')->find($id);  // Inclure la relation avec l'utilisateur
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
            'statut' => 'required|in:en attente,en cours,termine,annule',
            'client_id' => 'required|exists:clients,id',
            'user_id' => 'required|exists:utilisateurs,id',  // Ajout de la validation pour user_id
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
            'statut' => 'sometimes|in:en attente,en cours,termine,annule',
            'client_id' => 'sometimes|exists:clients,id',
            'user_id' => 'sometimes|exists:utilisateurs,id',  // Ajout de la validation pour user_id
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

    

    public function getClients()
    {
        $clients = Client::with('projets')->get();
        return response()->json($clients);
    }
    public function getTaches()
    {
        $taches = Tache::with('projets')->get();
        return response()->json($taches);
    }
    public function getChefProjet()
    {
        $clients = Utilisateur::with('projets')->get();
        return response()->json($utilisateurs);
    }
    public function reunions()
    {
        return $this->hasMany(Reunion::class);
    }
}


