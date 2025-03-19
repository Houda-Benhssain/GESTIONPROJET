<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('taches', function (Blueprint $table) {
            // Modifier la colonne 'statut' pour la transformer en enum
            $table->enum('statut', ['À faire', 'En cours', 'Terminé'])->default('À faire')->change();
            
            // Modifier la colonne 'priorite' pour la transformer en enum
            $table->enum('priorite', ['Haute', 'Faible', 'Moyenne'])->default('Moyenne')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('taches', function (Blueprint $table) {
            // Revenir aux types de colonnes d'origine si nécessaire
            $table->string('statut')->change();
            $table->string('priorite')->change();
        });
    }
};

