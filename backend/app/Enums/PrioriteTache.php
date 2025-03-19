<?php

namespace App\Enums;

enum PrioriteTache: string
{
    case BASSE = 'basse';
    case MOYENNE = 'moyenne';
    case HAUTE = 'haute';
    case CRITIQUE = 'critique';

    public static function valeurs(): array
    {
        return array_column(self::cases(), 'value');
    }
}


