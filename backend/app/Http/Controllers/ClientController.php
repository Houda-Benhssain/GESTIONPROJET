<?php
namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function show($id)
    {
        // Récupérer le client avec ses projets et l'utilisateur
        $client = Client::with(['utilisateur', 'projets'])->find($id);

        // Vérifier si le client existe
        if (!$client) {
            return response()->json(['message' => 'Client non trouvé'], 404);
        }

        return response()->json($client);
    }
    public function index()
    {
        $clients = Client::with('utilisateur','projets')->get();
        // $clients = Client::with('projets')->get();
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
        'user_id' => 'required|exists:utilisateurs,id',
        'telephone' => 'nullable|string|max:20',
        'adresse' => 'nullable|string|max:255',
    ]);

    // Vérifier si l'utilisateur a bien le rôle "client"
    $utilisateur = \App\Models\Utilisateur::find($request->user_id);

    if (!$utilisateur || $utilisateur->role !== 'client') {
        return response()->json(['message' => 'Seuls les utilisateurs avec le rôle "client" peuvent être ajoutés en tant que client.'], 403);
    }

    // Création du client
    $client = Client::create([
        
        'telephone' => $request->telephone,
        'adresse' => $request->adresse,
        'user_id' => $request->user_id,
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





