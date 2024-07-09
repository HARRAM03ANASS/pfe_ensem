<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\FetchMoviesJob;

class FetchMovies extends Command
{
    protected $signature = 'fetch:movies';
    protected $description = 'Fetch movies from an external API and store them in the database';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        FetchMoviesJob::dispatch();
        $this->info('Fetch movies job dispatched successfully.');
    }
}
