@extends('layouts.admin.app')

@section('content')
<div class="page-wrapper">
    <div class="page-header d-print-none">
        <div class="container-xl">
            <div class="row g-2 align-items-center">
                <div class="col">
                    <h2 class="page-title">
                        Settings
                    </h2>
                </div>
            </div>
        </div>
    </div>

    <div class="page-body">
        <div class="container-xl">
            @if(session('success'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif

            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Game Settings</h3>
                        </div>
                        <div class="card-body">
                            <form action="{{ route('admin.settings.update') }}" method="POST">
                                @csrf
                                
                                <div class="mb-3">
                                    <label class="form-label required">Game Time Limit (seconds)</label>
                                    <input 
                                        type="number" 
                                        name="game_time_limit" 
                                        class="form-control @error('game_time_limit') is-invalid @enderror" 
                                        value="{{ old('game_time_limit', $settings['game_time_limit']) }}"
                                        min="10"
                                        max="300"
                                        required
                                    >
                                    <small class="form-hint">Set the duration of each game session (10-300 seconds)</small>
                                    @error('game_time_limit')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Camera Feed</label>
                                    <div>
                                        <label class="form-check form-switch">
                                            <input type="hidden" name="show_camera_feed" value="0">
                                            <input 
                                                class="form-check-input" 
                                                type="checkbox" 
                                                name="show_camera_feed" 
                                                value="1"
                                                {{ old('show_camera_feed', $settings['show_camera_feed']) == 1 ? 'checked' : '' }}
                                            >
                                            <span class="form-check-label">Show camera feed during registration</span>
                                        </label>
                                    </div>
                                    <small class="form-hint">Toggle camera feed visibility on the registration screen</small>
                                </div>

                                <div class="mt-4">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-save me-2"></i>
                                        Save Settings
                                    </button>
                                    <a href="{{ route('admin.dashboard') }}" class="btn btn-link">Cancel</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Current Configuration</h3>
                        </div>
                        <div class="card-body">
                            <dl class="row">
                                <dt class="col-7">Game Duration:</dt>
                                <dd class="col-5 text-end">{{ $settings['game_time_limit'] }}s</dd>
                                
                                <dt class="col-7">Camera Feed:</dt>
                                <dd class="col-5 text-end">
                                    @if($settings['show_camera_feed'] == 1)
                                        <span class="badge bg-success">Visible</span>
                                    @else
                                        <span class="badge bg-secondary">Hidden</span>
                                    @endif
                                </dd>
                            </dl>
                        </div>
                    </div>

                    <div class="card mt-3">
                        <div class="card-body">
                            <h4 class="card-title">About Settings</h4>
                            <p class="text-muted small mb-0">
                                These settings control the game experience. Changes take effect immediately for new game sessions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
