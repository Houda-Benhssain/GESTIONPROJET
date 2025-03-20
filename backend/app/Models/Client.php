<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = 'clients';
    protected $primaryKey = 'id';

    protected $fillable = [
        'telephone', 'adresse', 'user_id'
    ];
    

    // Relation avec l'utilisateur (Utilisateur)
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'user_id'); // Assurez-vous que `user_id` existe dans la table `clients`
    }
    public function projet()
{
    return $this->belongsTo(Projet::class); // Assure-toi que le nom de la relation est correct
}

    public function projets()
{
    return $this->hasMany(Projet::class, 'client_id');
}
}

