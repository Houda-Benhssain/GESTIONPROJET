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
        Schema::create('reunions', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['Réunion de lancement', 'Réunion de planification', 'Réunion de suivi', 'Réunion de revue','Réunion de rétrospective','Réunion de clôture '])->default('Réunion de lancement');
            $table->date('date');
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->foreignId('user_id')->constrained('utilisateurs')->onDelete('cascade');
            $table->foreignId('project_id')->constrained('projets')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reunions');
    }
};
