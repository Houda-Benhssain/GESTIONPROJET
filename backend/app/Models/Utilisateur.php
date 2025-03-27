<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
class Utilisateur  extends Authenticatable

{
    use Notifiable;
    
    protected $table = 'utilisateurs';  

    protected $fillable = [
        'nom', 'email', 'password', 'role'
    ];

    protected $hidden = ['password'];

    
    public function projets()
    {
        return $this->hasMany(Projet::class);
    }
   
    // Relation avec Client (si un utilisateur peut être un client)
    public function clients()
    {
        return $this->hasMany(Client::class);
    }

}
 // Relation avec Projet
