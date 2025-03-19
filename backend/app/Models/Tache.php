<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\StatutTache;
use App\Enums\PrioriteTache;

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

    // Relations
    public function projet()
    {
        return $this->belongsTo(Projet::class, 'project_id');
    }

    public function user()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    // ✅ Accesseurs et mutateurs pour gérer les enums
    public function getStatutAttribute($value): StatutTache
    {
        return StatutTache::from($value);
    }

    public function setStatutAttribute(StatutTache $statut)
    {
        $this->attributes['statut'] = $statut->value;
    }

    public function getPrioriteAttribute($value): PrioriteTache
    {
        return PrioriteTache::from($value);
    }

    public function setPrioriteAttribute(PrioriteTache $priorite)
    {
        $this->attributes['priorite'] = $priorite->value;
    }
}
