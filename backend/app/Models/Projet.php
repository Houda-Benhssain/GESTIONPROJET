<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;

    protected $table = 'projets';

    protected $fillable = [
        'nom',
        'description',
        'dateDebut',
        'dateFin',
        'status',
        'client_id',
    ];

    const STATUT_A_FAIRE = 'a faire';
    const STATUT_EN_COURS = 'en cours';
    const STATUT_FINI = 'fini';

    
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function taches()
{
    return $this->hasMany(Tache::class);
}

}
