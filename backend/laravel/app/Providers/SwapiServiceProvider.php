<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\StarWars\StarWarsServiceInterface;
use App\Services\StarWars\SwapiService;

class SwapiServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(StarWarsServiceInterface::class, SwapiService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
