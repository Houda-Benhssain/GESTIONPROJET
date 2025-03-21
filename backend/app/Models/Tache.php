<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tache extends Model
{
    use HasFactory;

    protected $table = 'taches';

    protected $fillable = [
        'nom',
        'statut',
        'dateDebut',
        'dateFin',
        'priorite',
        'project_id',
        'user_id',
    ];

    public const STATUTS = ['en attente', 'en cours', 'terminee', 'annulee'];
    public const PRIORITES = ['basse', 'moyenne', 'haute', 'critique'];

    // Relations
    public function projet()
    {
        return $this->belongsTo(Projet::class, 'project_id');
    }

    public function user()
    {
        return $this->belongsTo(Utilisateur::class);
    }
}
