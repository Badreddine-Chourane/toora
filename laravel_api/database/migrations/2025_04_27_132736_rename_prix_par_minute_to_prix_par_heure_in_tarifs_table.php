<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('tarifs', function (Blueprint $table) {
        $table->renameColumn('prix_par_minute', 'prix_par_heure');
    });
}

public function down()
{
    Schema::table('tarifs', function (Blueprint $table) {
        $table->renameColumn('prix_par_heure', 'prix_par_minute');
    });
}
};
