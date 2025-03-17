<?php
namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function show($id)
    {
        $client = Client::with('utilisateur')->find($id);

        if ($client) {
            $userInfo = $client->utilisateur; 
            $clientInfo = [
                'nom' => $userInfo->nom,  
                'email' => $userInfo->email,  
                'role' => $userInfo->role, 
                'telephone' => $client->telephone,  
                'adresse' => $client->adresse, 
            ];

            return response()->json($clientInfo);
        }

        return response()->json(['error' => 'Client non trouvé'], 404);
    }
    public function index()
    {
        $clients = Client::with('utilisateur')->get();
        return response()->json($clients);
    }
    public function update(Request $request, $id)
    {
        $client = Client::with('utilisateur')->find($id);
    
        if (!$client) {
            return response()->json(['message' => 'Client non trouvé'], 404);
        }
        $client->telephone = $request->input('telephone');
        $client->adresse = $request->input('adresse', null);
        $client->save();
        $utilisateur = $client->utilisateur;
        $utilisateur->nom = $request->input('nom');
        $utilisateur->email = $request->input('email');
        $utilisateur->role = $request->input('role');
        $utilisateur->save();
    
        return response()->json(['message' => 'Client et utilisateur mis à jour avec succès']);
    }
}





