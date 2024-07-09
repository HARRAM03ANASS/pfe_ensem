<?php

namespace App\Jobs;

use App\Models\Movie;
use Illuminate\Support\Arr;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class FetchMoviesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $apiKey = env('TMDB_API_KEY');
        $page = 300; // Start with page 1
        $pagesToFetch = 10; // Number of pages to fetch (adjust as needed)

        for ($i = 0; $i < $pagesToFetch; $i++) {
            // Make an HTTP GET request to TMDb API for the current page
            $response = Http::get("https://api.themoviedb.org/3/movie/popular", [
                'api_key' => $apiKey,
                'page' => $page,
            ]);

            // Check if the request was successful
            if ($response->successful()) {
                $movies = $response->json()['results'];

                foreach ($movies as $movieData) {
                    // Fetch detailed information for each movie
                    $detailsResponse = Http::get("https://api.themoviedb.org/3/movie/{$movieData['id']}", [
                        'api_key' => $apiKey,
                        'append_to_response' => 'credits', // Include credits in the response
                    ]);

                    if ($detailsResponse->successful()) {
                        $details = $detailsResponse->json();

                        // Get director
                        $director = 'Unknown';
                        if (isset($details['credits']['crew'])) {
                            foreach ($details['credits']['crew'] as $crew) {
                                if ($crew['job'] === 'Director') {
                                    $director = $crew['name'];
                                    break;
                                }
                            }
                        }

                        // JSON encode genres and cast
                        $genres = json_encode(Arr::pluck($details['genres'] ?? [], 'id'));
                        $cast = json_encode(Arr::pluck($details['credits']['cast'] ?? [], 'name'));

                        // Ensure release_date is not empty
                        $releaseDate = !empty($details['release_date']) ? $details['release_date'] : null;

                        Movie::updateOrCreate(
                            ['api_id' => $details['id']],
                            [
                                'title' => $details['title'],
                                'description' => $details['overview'],
                                'release_date' => $releaseDate,
                                'poster_path' => $details['poster_path'] ?? null,
                                'backdrop_path' => $details['backdrop_path'] ?? null,
                                'runtime' => $details['runtime'] ?? null,
                                'tagline' => $details['tagline'] ?? null,
                                'director' => $director,
                                'genres' => $genres,
                                'cast' => $cast,
                            ]
                        );
                    } else {
                        Log::error('Failed to fetch detailed information for movie with id ' . $movieData['id']);
                    }
                }

                Log::info('Fetched and stored movies for page ' . $page);

                // Move to the next page for the next iteration
                $page++;

                // Introduce a delay between requests to avoid rate limiting
                sleep(1); // Sleep for 1 second
            } else {
                Log::error('Failed to fetch movies from API: ' . $response->status());
                break; // Exit loop on API failure
            }
        }
    }
}
