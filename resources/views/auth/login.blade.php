<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>{{ config('app.name', 'Laravel') }} - Login</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
    
    <!-- Tabler Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
    
    <!-- Admin Styles -->
    @vite(['resources/sass/admin/app.scss', 'resources/js/admin/app.js'])
</head>
<body class="d-flex flex-column">
    <div class="page page-center">
        <div class="container container-tight py-4">
            <div class="text-center mb-4">
                <a href="/" class="navbar-brand navbar-brand-autodark">
                    <h1 class="mb-0">{{ config('app.name', 'Laravel') }}</h1>
                </a>
            </div>
            <div class="card card-md">
                <div class="card-body">
                    <h2 class="h2 text-center mb-4">
                        <i class="ti ti-login me-2"></i>Login to your account
                    </h2>
                    
                    <!-- Session Status -->
                    @if (session('status'))
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <i class="ti ti-check me-2"></i>{{ session('status') }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('login') }}" autocomplete="off">
                        @csrf

                        <!-- Email Address -->
                        <div class="mb-3">
                            <label class="form-label">
                                <i class="ti ti-mail me-1"></i>Email address
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                class="form-control @error('email') is-invalid @enderror" 
                                placeholder="your@email.com"
                                value="{{ old('email') }}" 
                                required 
                                autofocus 
                                autocomplete="username"
                            >
                            @error('email')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <!-- Password -->
                        <div class="mb-2">
                            <label class="form-label">
                                <i class="ti ti-key me-1"></i>Password
                                @if (Route::has('password.request'))
                                    <span class="form-label-description">
                                        <a href="{{ route('password.request') }}">Forgot password?</a>
                                    </span>
                                @endif
                            </label>
                            <input 
                                type="password" 
                                name="password" 
                                class="form-control @error('password') is-invalid @enderror" 
                                placeholder="Your password"
                                required 
                                autocomplete="current-password"
                            >
                            @error('password')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <!-- Remember Me -->
                        <div class="mb-3">
                            <label class="form-check">
                                <input type="checkbox" class="form-check-input" name="remember">
                                <span class="form-check-label">Remember me on this device</span>
                            </label>
                        </div>

                        <div class="form-footer">
                            <button type="submit" class="btn btn-primary w-100">
                                <i class="ti ti-login me-2"></i>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
