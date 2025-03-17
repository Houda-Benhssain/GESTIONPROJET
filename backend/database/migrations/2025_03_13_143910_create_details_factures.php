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
        Schema::create('detailsFactures', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->decimal('montant');
            $table->foreignId('idFacture')->constrained('factures')->onDelete('cascade');
            $table->foreignId('idTache')->constrained('taches')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detailsFactures');
    }
};
