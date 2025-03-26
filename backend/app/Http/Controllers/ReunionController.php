<?php

namespace App\Http\Controllers;

use App\Models\Reunion;
use App\Models\Utilisateur;
use App\Models\Projet;
use Illuminate\Http\Request;

class ReunionController extends Controller
{
    // Enregistrer une réunion dans la base de données
    public function store(Request $request)
    {
        // Validation des données
        $request->validate([
            'type' => 'required|in:Réunion de lancement,Réunion de planification,Réunion de suivi,Réunion de revue,Réunion de rétrospective,Réunion de clôture',
            'date' => 'required|date',
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i|after:heure_debut', // Vérifie que l'heure de fin est après l'heure de début
            'user_id' => 'required|exists:utilisateurs,id',
            'project_id' => 'required|exists:projets,id',
        ]);

        // Créer une nouvelle réunion
        $reunion = new Reunion();
        $reunion->type = $request->type;
        $reunion->date = $request->date;
        $reunion->heure_debut = $request->heure_debut;
        $reunion->heure_fin = $request->heure_fin;
        $reunion->user_id = $request->user_id;
        $reunion->project_id = $request->project_id;
        $reunion->save();

        // Retourner une réponse JSON ou rediriger
        return response()->json([
            'message' => 'Réunion créée avec succès!',
            'reunion' => $reunion
        ], 201); // Code HTTP 201 pour la création réussie
    }

    

    // Afficher une réunion spécifique
    public function show($id)
    {
        $reunion = Reunion::find($id);

        if (!$reunion) {
            return response()->json(['message' => 'Réunion non trouvée'], 404);
        }

        return response()->json([
            'reunion' => $reunion
        ]);
    }
    // Afficher toutes les réunions avec les projets associés
public function index()
{
    $reunions = Reunion::with('projet')->get();

    return response()->json([
        'reunions' => $reunions
    ]);
}
}
