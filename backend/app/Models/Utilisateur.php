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

}
