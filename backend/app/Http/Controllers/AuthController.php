<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Valider les données d'entrée
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $utilisateur = Utilisateur::where('email', $request->email)->first();

        if ($utilisateur && $utilisateur->password === $request->password) {
            Auth::login($utilisateur);
            return response()->json([
                'message' => 'Connexion réussie',
                'user' => $utilisateur,
                'role' => $utilisateur->role,
            ], 200);
        }

        return response()->json(['error' => 'Identifiants incorrects'], 401);
    }
}

