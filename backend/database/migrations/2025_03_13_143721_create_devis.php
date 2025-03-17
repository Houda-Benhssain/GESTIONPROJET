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
        Schema::create('devis', function (Blueprint $table) {
            $table->id();
            $table->integer('numeroDevis');
            $table->decimal('taxe');
            $table->decimal('montantTotal');
            $table->enum('statut', ['en attente', 'approuve', 'refuse', 'expire'])->default('en attente');
            $table->date('dateCreation');
            $table->date('dateValidation');
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('project_id')->constrained('projets')->onDelete('cascade');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devis');
    }
};
