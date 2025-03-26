<?php
namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function show($id)
{
    $client = Client::with(['utilisateur', 'projets.user'])->find($id);

    if (!$client) {
        return response()->json(['message' => 'Client non trouvé'], 404);
    }

    return response()->json($client);
}

    public function index()
{
    $clients = Client::with('utilisateur', 'projets.user')->get();
    return response()->json($clients);
}

    public function update(Request $request, $id)
{
    $client = Client::with(['utilisateur', 'projets'])->find($id);

    if (!$client) {
        return response()->json(['message' => 'Client non trouvé'], 404);
    }

    // Mise à jour des informations du client
    $client->telephone = $request->input('telephone');
    $client->adresse = $request->input('adresse');
    $client->save();

    // Mise à jour des informations de l'utilisateur lié
    $utilisateur = $client->utilisateur;
    $utilisateur->nom = $request->input('utilisateur.nom');
    $utilisateur->email = $request->input('utilisateur.email');
    $utilisateur->role = $request->input('utilisateur.role');
    $utilisateur->save();

    return response()->json(['message' => 'Client et utilisateur mis à jour avec succès']);
}


public function store(Request $request)
{
    // Validation des données entrantes
    $request->validate([
        'nom' => 'required|string|max:255',
        'email' => 'required|email|unique:utilisateurs,email',
        'telephone' => 'nullable|string|max:20',
        'adresse' => 'nullable|string|max:255',
    ]);

    // Créer un utilisateur avec un mot de passe par défaut
    $utilisateur = \App\Models\Utilisateur::create([
        'nom' => $request->nom,
        'email' => $request->email,
        'password' => bcrypt('password123'), // Mot de passe par défaut
        'role' => 'client', // Role par défaut 'client'
    ]);

    // Création du client avec l'ID de l'utilisateur nouvellement créé
    $client = Client::create([
        'telephone' => $request->telephone,
        'adresse' => $request->adresse,
        'user_id' => $utilisateur->id, // Utilisation de l'ID de l'utilisateur
    ]);

    return response()->json(['message' => 'Client ajouté avec succès', 'client' => $client], 201);
}



public function destroy($id)
{
    $client = Client::find($id);

    if (!$client) {
        return response()->json(['message' => 'Client non trouvé'], 404);
    }

    // Supprimer le client
    $client->delete();

    return response()->json(['message' => 'Client supprimé avec succès']);
}


}





