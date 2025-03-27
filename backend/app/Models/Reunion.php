<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reunion extends Model
{
    use HasFactory;

    // Spécifier la table
    protected $table = 'reunions';

    // Clé primaire de la table
    protected $primaryKey = 'id';

    // Activer les timestamps
    public $timestamps = true;

    // Les attributs pouvant être massivement assignés
    protected $fillable = [
        'type',         // Type de la réunion
        'date',         // Date de la réunion
        'dateDebut',    // Date et heure de début de la réunion
        'dateFin',      // Date et heure de fin de la réunion
        'user_id',      // ID de l'utilisateur
        'project_id',   // ID du projet
    ];

    // Définir les attributs de type date pour la conversion automatique
    protected $dates = [
        'date', 'dateDebut', 'dateFin',
    ];

    // Relation : Une réunion appartient à un utilisateur
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'user_id');
    }

    // Relation : Une réunion appartient à un projet
    public function projet()
    {
        return $this->belongsTo(Projet::class, 'project_id');
    }

    // Optionnel : Formater la date de début si nécessaire
    public function getDateDebutAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('Y-m-d H:i:s');
    }

    // Optionnel : Formater la date de fin si nécessaire
    public function getDateFinAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('Y-m-d H:i:s');
    }
}

