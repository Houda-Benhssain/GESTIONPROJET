<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyStatutInProjetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projets', function (Blueprint $table) {
            // Supprimer la colonne 'statut' existante si nécessaire
            $table->dropColumn('statut');
            
            // Ajouter la nouvelle colonne 'status' avec les valeurs 'enum'
            $table->enum('status', ['A faire', 'En cours', 'Fini'])->default('A faire');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projets', function (Blueprint $table) {
            $table->date('statut'); 
            $table->dropColumn('status'); 
        });
    }
}
