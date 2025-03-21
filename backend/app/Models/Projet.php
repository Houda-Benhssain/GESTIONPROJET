<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;

    // Nom de la table
    protected $table = 'projets';

    // Champs qui peuvent être remplis
    protected $fillable = [
        'nom',
        'description',
        'dateDebut',
        'dateFin',
        'statut',
        'client_id',
        'user_id',  // Ajout du user_id
    ];

    // Constantes pour les statuts
    const STATUT_ENATTENTE = 'en attente';
    const STATUT_EN_COURS = 'en cours';
    const STATUT_FINI = 'termine';
    const STATUT_ANNULE = 'annule';

    // Relation avec le client
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    // Relation avec l'utilisateur
    public function user()
    {
        return $this->belongsTo(Utilisateur::class);  // Relation avec l'utilisateur
    }

    // Relation avec les tâches
    public function taches()
    {
        return $this->hasMany(Tache::class);
    }

    // Accesseur pour afficher le statut lisible
    public function getStatusAttribute($value)
    {
        switch ($value) {
            case self::STATUT_ENATTENTE:
                return 'en attente';
            case self::STATUT_EN_COURS:
                return 'En cours';
            case self::STATUT_FINI:
                return 'Fini';
            case self::STATUT_ANNULE:
                return 'annule';
            default:
                return 'Non défini';
        }
    }

    // Mutateur pour enregistrer le statut
    public function setStatusAttribute($value)
    {
        if (!in_array($value, [self::STATUT_ENATTENTE, self::STATUT_EN_COURS, self::STATUT_FINI, self::STATUT_ANNULE])) {
            throw new \InvalidArgumentException("Statut invalide");
        }
        $this->attributes['statut'] = $value;  // Correction de l'attribut `status` à `statut`
    }
}

