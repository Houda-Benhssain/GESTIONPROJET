<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tache extends Model
{
    use HasFactory;

    protected $table = 'taches'; // Nom de la table en base de données

    protected $fillable = [
        'nom',
        'statut',
        'dateDebut',
        'dateFin',
        'priorite',
        'project_id',
        'user_id',
    ];

    public function project()
    {
        return $this->belongsTo(Projet::class, 'project_id');
    }

    public function user()
    {
        return $this->belongsTo(Utilisateur::class, 'user_id');
    }
}

