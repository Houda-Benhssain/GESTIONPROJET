<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur; // Import Utilisateur model
use Illuminate\Http\Request;

class UtilisateurController extends Controller
{
    // Show a list of all users
    public function index()
    {
        $utilisateurs = Utilisateur::all();
        return response()->json($utilisateurs);
    }

    // Show a single user
    public function show($id)
    {
        $utilisateur = Utilisateur::find($id);

        if (!$utilisateur) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($utilisateur);
    }

    // Create a new user
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs',
            'password' => 'required|string|min:8',
            'role' => 'required|string',
        ]);

        $utilisateur = Utilisateur::create([
            'nom' => $validatedData['nom'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
            'role' => $validatedData['role'],
        ]);

        return response()->json($utilisateur, 201); // Return the created user
    }

    // Update an existing user
    public function update(Request $request, $id)
    {
        $utilisateur = Utilisateur::find($id);

        if (!$utilisateur) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs,email,' . $id,
            'password' => 'nullable|string|min:8', // Password is optional in update
            'role' => 'required|string',
        ]);

        if ($request->has('password')) {
            $validatedData['password'] = bcrypt($validatedData['password']);
        }

        $utilisateur->update($validatedData);

        return response()->json($utilisateur);
    }

    // Delete a user
    public function destroy($id)
    {
        $utilisateur = Utilisateur::find($id);

        if (!$utilisateur) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $utilisateur->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}

