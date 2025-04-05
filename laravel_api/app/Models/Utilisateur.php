<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    /** @use HasFactory<\Database\Factories\UtilisateurFactory> */
    use HasFactory;

    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe',
        'role',
        'ville_id'

    ];
    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }

    public function locations()
    {
        return $this->hasMany(Location::class);
    }
}
