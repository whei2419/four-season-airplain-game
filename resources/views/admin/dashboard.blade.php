@extends('layouts.admin.app')

@section('content')
<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <h2 class="page-title">Dashboard</h2>
                <div class="text-muted mt-1">Welcome back, {{ Auth::user()->name }}!</div>
            </div>
            <div class="col-auto ms-auto">
                <a href="{{ route('admin.players') }}" class="btn btn-primary">
                    <i class="ti ti-users"></i> View All Players
                </a>
            </div>
        </div>
    </div>
</div>

<div class="page-body">
    <div class="container-xl">
        <!-- Stats Row -->
        <div class="row row-deck row-cards">
            <div class="col-sm-6 col-lg-3">
                <div class="card dashboard-card">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="subheader">Total Players</div>
                        </div>
                        <div class="h1 mb-3">{{ number_format($stats['total_players']) }}</div>
                        <div class="d-flex mb-2">
                            <div>Registered players</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-sm-6 col-lg-3">
                <div class="card dashboard-card">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="subheader">Games Played</div>
                        </div>
                        <div class="h1 mb-3">{{ number_format($stats['total_played']) }}</div>
                        <div class="d-flex mb-2">
                            <div>Players who played</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-sm-6 col-lg-3">
                <div class="card dashboard-card">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="subheader">QR Scanned</div>
                        </div>
                        <div class="h1 mb-3">{{ number_format($stats['total_scanned']) }}</div>
                        <div class="d-flex mb-2">
                            <div>Rewards claimed</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-sm-6 col-lg-3">
                <div class="card dashboard-card">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="subheader">Avg Score</div>
                        </div>
                        <div class="h1 mb-3">{{ number_format($stats['avg_score'], 1) }}</div>
                        <div class="d-flex mb-2">
                            <div>High: {{ $stats['highest_score'] }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Recent Players -->
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Recent Players</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-vcenter">
                                <thead>
                                    <tr>
                                        <th>Player</th>
                                        <th>Flight</th>
                                        <th>Score</th>
                                        <th>Played</th>
                                        <th>Scanned</th>
                                        <th>Registered</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse($recent_players as $player)
                                    <tr>
                                        <td>
                                            <div class="d-flex flex-column">
                                                <span class="fw-bold">{{ $player->player_name }}</span>
                                                <span class="text-muted small">{{ $player->email }}</span>
                                            </div>
                                        </td>
                                        <td>{{ $player->flight_number }}</td>
                                        <td>
                                            <span class="badge bg-{{ $player->score >= 26 ? 'success' : ($player->score >= 16 ? 'info' : 'secondary') }}">
                                                {{ $player->score }} pts
                                            </span>
                                        </td>
                                        <td>
                                            @if($player->score > 0)
                                                <span class="badge bg-success">Yes</span>
                                            @else
                                                <span class="badge bg-secondary">No</span>
                                            @endif
                                        </td>
                                        <td>
                                            @if($player->scanned)
                                                <span class="badge bg-success">Yes</span>
                                            @else
                                                <span class="badge bg-secondary">No</span>
                                            @endif
                                        </td>
                                        <td>{{ $player->created_at->diffForHumans() }}</td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td colspan="6" class="text-center text-muted">No players yet</td>
                                    </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                            <div class="subheader">High Score</div>
                        </div>
                        <div class="h1 mb-3">0</div>
                        <div class="d-flex mb-2">
                            <div>Best score today</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-sm-6 col-lg-3">
                <div class="card dashboard-card">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="subheader">Active Now</div>
                        </div>
                        <div class="h1 mb-3">0</div>
                        <div class="d-flex mb-2">
                            <div>Players online</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Recent Activity -->
        <div class="row row-cards mt-3">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Recent Game Activity</h3>
                    </div>
                    <div class="card-body">
                        <div class="text-center py-5">
                            <p class="text-muted">No recent activity</p>
                            <a href="{{ route('game.index') }}" class="btn btn-primary">Play Game</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="row row-cards mt-3">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Quick Actions</h3>
                    </div>
                    <div class="list-group list-group-flush">
                        <a href="{{ route('game.index') }}" class="list-group-item list-group-item-action">
                            <i class="ti ti-device-gamepad me-2"></i> Play Game
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">
                            <i class="ti ti-trophy me-2"></i> View Leaderboard
                        </a>
                        <a href="{{ route('profile.edit') }}" class="list-group-item list-group-item-action">
                            <i class="ti ti-user me-2"></i> Edit Profile
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">System Information</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <div class="text-muted">Version</div>
                                    <div>1.0.0</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <div class="text-muted">Environment</div>
                                    <div>{{ config('app.env') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
