<?php

namespace App\Http\Controllers;

use App\Models\Reunion;
use Illuminate\Http\Request;

class ReunionController extends Controller
{
    // Récupérer toutes les réunions
    public function index()
    {
        $reunions = Reunion::with('projet')->get();

        return response()->json($reunions);
    }

    // Ajouter une nouvelle réunion
    public function store(Request $request)
    {
        // Validation des données envoyées
        $request->validate([
            'type' => 'required|in:Réunion de lancement,Réunion de planification,Réunion de suivi,Réunion de revue,Réunion de rétrospective,Réunion de clôture', // Le type de réunion doit être l'un des types définis dans l'énumération
            'date' => 'required|date', // La date de la réunion au format YYYY-MM-DD
            'dateDebut' => 'required|date_format:Y-m-d H:i:s', // La date et heure de début
            'dateFin' => 'required|date_format:Y-m-d H:i:s|after:dateDebut', // La date et heure de fin, qui doit être après la date de début
            'user_id' => 'required|exists:utilisateurs,id', // L'ID de l'utilisateur (doit exister dans la table des utilisateurs)
            'project_id' => 'required|exists:projets,id', // L'ID du projet (doit exister dans la table des projets)
        ]);

        // Créer la réunion dans la base de données
        $reunion = Reunion::create([
            'type' => $request->type,      
            'date' => $request->date,      
            'dateDebut' => $request->dateDebut, 
            'dateFin' => $request->dateFin,    
            'user_id' => $request->user_id, 
            'project_id' => $request->project_id, 
        ]);

        // Retourner une réponse avec le message et les informations de la réunion créée
        return response()->json(['message' => 'Réunion créée avec succès', 'reunion' => $reunion], 201);
    }

    // Afficher une réunion spécifique
    public function show($id)
    {
        $reunion = Reunion::find($id);

        if (!$reunion) {
            return response()->json(['message' => 'Réunion non trouvée'], 404);
        }

        return response()->json($reunion);
    }

    // Mettre à jour une réunion
    public function update(Request $request, $id)
    {
        $reunion = Reunion::find($id);

        if (!$reunion) {
            return response()->json(['message' => 'Réunion non trouvée'], 404);
        }

        // Validation des données envoyées
        $request->validate([
            'type' => 'required|in:Réunion de lancement,Réunion de planification,Réunion de suivi,Réunion de revue,Réunion de rétrospective,Réunion de clôture',
            'date' => 'required|date',
            'dateDebut' => 'required|date_format:Y-m-d H:i:s',
            'dateFin' => 'required|date_format:Y-m-d H:i:s|after:dateDebut',
            'user_id' => 'required|exists:utilisateurs,id',
            'project_id' => 'required|exists:projets,id',
        ]);

        // Mettre à jour la réunion
        $reunion->update([
            'type' => $request->type,
            'date' => $request->date,
            'dateDebut' => $request->dateDebut,
            'dateFin' => $request->dateFin,
            'user_id' => $request->user_id,
            'project_id' => $request->project_id,
        ]);

        return response()->json(['message' => 'Réunion mise à jour avec succès', 'reunion' => $reunion]);
    }

    // Supprimer une réunion
    public function destroy($id)
    {
        $reunion = Reunion::find($id);

        if (!$reunion) {
            return response()->json(['message' => 'Réunion non trouvée'], 404);
        }

        $reunion->delete();

        return response()->json(['message' => 'Réunion supprimée avec succès']);
    }
}
