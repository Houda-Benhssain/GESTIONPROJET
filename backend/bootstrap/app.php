<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            'projets/*',
            'http://example.com/foo/bar',
            'http://example.com/foo/*',
        ]);
        $middleware->validateCsrfTokens(except: [
            'projets/',
            'http://example.com/foo/bar',
            'http://example.com/foo/*',
        ]);
        $middleware->validateCsrfTokens(except: [
            'taches/',
            'http://example.com/foo/bar',
            'http://example.com/foo/*',
        ]);
        $middleware->validateCsrfTokens(except: [
            'taches/*',
            'http://example.com/foo/bar',
            'http://example.com/foo/*',
        ]);
        $middleware->validateCsrfTokens(except: [
            'clients/',
            'http://example.com/foo/bar',
            'http://example.com/foo/*',
        ]);
        $middleware->validateCsrfTokens(except: [
            'clients/*',
            'http://example.com/foo/bar',
            'http://example.com/foo/*',
        ]);
        $middleware->validateCsrfTokens(except: [
            'utilisateurs/*',
            'http://example.com/foo/bar',
            'http://example.com/foo/*',
        ]);
        $middleware->validateCsrfTokens(except: [
            'utilisateurs/',
            'http://example.com/foo/bar',
            'http://example.com/foo/*',
        ]);
        $middleware->validateCsrfTokens(except: [
            'login/',
            'http://example.com/foo/bar',
            'http://example.com/foo/*',
        ]);
        $middleware->validateCsrfTokens(except: [
            'reunions/',
            'http://example.com/foo/bar',
            'http://example.com/foo/*',
        ]);
        $middleware->validateCsrfTokens(except: [
            'reunions/*',
            'http://example.com/foo/bar',
            'http://example.com/foo/*',
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
