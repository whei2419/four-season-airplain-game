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

        @if(session('error'))
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="ti ti-alert-triangle me-2"></i>{{ session('error') }}
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

        <!-- Dangerous Actions -->
        <div class="row mt-4">
            <div class="col-12">
                <div class="card border-danger">
                    <div class="card-header bg-danger-lt">
                        <h3 class="card-title text-danger">
                            <i class="ti ti-alert-triangle me-2"></i>Danger Zone
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-8">
                                <h4 class="mb-1">Clear All Player Data</h4>
                                <p class="text-muted mb-0">
                                    Permanently delete all player records, scores, and QR codes. This action cannot be undone.
                                </p>
                            </div>
                            <div class="col-md-4 text-md-end mt-3 mt-md-0">
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#clearPlayersModal">
                                    <i class="ti ti-trash me-2"></i>Clear All Players
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Clear All Players Confirmation Modal -->
<div class="modal fade" id="clearPlayersModal" tabindex="-1" aria-labelledby="clearPlayersModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="clearPlayersModalLabel">
                    <i class="ti ti-alert-triangle me-2"></i>Confirm Clear All Players
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{ route('admin.settings.clear-players') }}" method="POST" id="clearPlayersForm">
                @csrf
                @method('DELETE')
                <div class="modal-body">
                    <div class="alert alert-danger d-flex align-items-start mb-3">
                        <i class="ti ti-alert-triangle me-2 mt-1" style="font-size: 1.5rem;"></i>
                        <div>
                            <strong>Warning:</strong> This will permanently delete all player data including:
                            <ul class="mb-0 mt-2 ps-3">
                                <li>Player names and contact information</li>
                                <li>Game scores and flight numbers</li>
                                <li>QR codes and scan records</li>
                            </ul>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label required">Enter your password to confirm</label>
                        <input 
                            type="password" 
                            name="password" 
                            class="form-control" 
                            placeholder="Your admin password"
                            required
                            autocomplete="current-password"
                        >
                        <small class="text-muted">You must enter your password to proceed with this action.</small>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="confirmClear" required>
                        <label class="form-check-label" for="confirmClear">
                            I understand this action cannot be undone
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-danger">
                        <i class="ti ti-trash me-2"></i>Clear All Players
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
