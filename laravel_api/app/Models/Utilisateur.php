<?php
// app/Models/Utilisateur.php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // Change here!
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Utilisateur extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe',
        'role',
        'ville_id'
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    // This tells Laravel which attribute should be used as the password.
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }

    public function locations()
    {
        return $this->hasMany(Location::class);
    }
}
