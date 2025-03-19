<?php

namespace App\Enums;

enum StatutTache: string
{
    case EN_ATTENTE = 'en attente';
    case EN_COURS = 'en cours';
    case TERMINEE = 'terminee';
    case ANNULEE = 'annulee';

    public static function valeurs(): array
    {
        return array_column(self::cases(), 'value');
    }
}
