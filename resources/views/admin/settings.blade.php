@extends('layouts.admin.app')

@section('content')
<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <h2 class="page-title">Settings</h2>
                <div class="text-muted mt-1">Configure game settings and preferences</div>
            </div>
        </div>
    </div>
</div>

<div class="page-body">
    <div class="container-xl">
        @if(session('success'))
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="ti ti-check me-2"></i>{{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        @endif

        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="ti ti-settings me-2"></i>Game Settings
                        </h3>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('admin.settings.update') }}" method="POST">
                            @csrf
                            
                            <div class="mb-3">
                                <label class="form-label required">
                                    <i class="ti ti-clock me-1"></i>Game Time Limit (seconds)
                                </label>
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
                                <label class="form-label">
                                    <i class="ti ti-camera me-1"></i>Camera Feed
                                </label>
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

                            <div class="mt-4 text-end">
                                <button type="submit" class="btn btn-primary">
                                    <i class="ti ti-device-floppy me-2"></i>
                                    Save Settings
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="ti ti-info-circle me-2"></i>Current Configuration
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-7">
                                <span class="text-muted">
                                    <i class="ti ti-clock me-1"></i>Game Duration:
                                </span>
                            </div>
                            <div class="col-5 text-end">
                                <span class="badge badge-outline text-primary">{{ $settings['game_time_limit'] }}s</span>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-7">
                                <span class="text-muted">
                                    <i class="ti ti-camera me-1"></i>Camera Feed:
                                </span>
                            </div>
                            <div class="col-5 text-end">
                                @if($settings['show_camera_feed'] == 1)
                                    <span class="badge badge-outline text-success">
                                        <i class="ti ti-eye me-1"></i>Visible
                                    </span>
                                @else
                                    <span class="badge badge-outline text-secondary">
                                        <i class="ti ti-eye-off me-1"></i>Hidden
                                    </span>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mt-3">
                    <div class="card-body">
                        <h4 class="card-title">
                            <i class="ti ti-bulb me-2"></i>About Settings
                        </h4>
                        <p class="text-muted small mb-0">
                            These settings control the game experience. Changes take effect immediately for new game sessions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
