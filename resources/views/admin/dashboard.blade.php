@extends('layouts.admin.app')

@section('content')
<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <h2 class="page-title">Dashboard</h2>
                <div class="text-muted mt-1">Welcome back, {{ Auth::user()->name }}!</div>
            </div>
        </div>
    </div>
</div>

<div class="page-body">
    <div class="container-xl">
        <!-- Stats Row -->
        <div class="row row-deck row-cards">
            <div class="col-sm-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <div class="avatar avatar-md bg-primary-lt text-primary me-3">
                                <i class="ti ti-users" style="font-size: 1.5rem;"></i>
                            </div>
                            <div>
                                <div class="text-muted small">Total Players</div>
                                <div class="h2 mb-0">{{ number_format($stats['total_players']) }}</div>
                            </div>
                        </div>
                        <div class="text-muted small">
                            <i class="ti ti-user-check me-1"></i>Registered players
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-sm-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <div class="avatar avatar-md bg-success-lt text-success me-3">
                                <i class="ti ti-trophy" style="font-size: 1.5rem;"></i>
                            </div>
                            <div>
                                <div class="text-muted small">Top Player</div>
                                <div class="h2 mb-0">{{ $stats['top_player_score'] }}</div>
                            </div>
                        </div>
                        <div class="text-muted small text-truncate">
                            <i class="ti ti-star me-1"></i>{{ $stats['top_player_name'] }}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-sm-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <div class="avatar avatar-md bg-info-lt text-info me-3">
                                <i class="ti ti-qrcode" style="font-size: 1.5rem;"></i>
                            </div>
                            <div>
                                <div class="text-muted small">QR Scanned</div>
                                <div class="h2 mb-0">{{ number_format($stats['total_scanned']) }}</div>
                            </div>
                        </div>
                        <div class="text-muted small">
                            <i class="ti ti-gift me-1"></i>Rewards claimed
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-sm-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <div class="avatar avatar-md bg-warning-lt text-warning me-3">
                                <i class="ti ti-chart-bar" style="font-size: 1.5rem;"></i>
                            </div>
                            <div>
                                <div class="text-muted small">Average Score</div>
                                <div class="h2 mb-0">{{ number_format($stats['avg_score'], 1) }}</div>
                            </div>
                        </div>
                        <div class="text-muted small">
                            <i class="ti ti-users me-1"></i>All players
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
                                        <th class="text-center">Played</th>
                                        <th class="text-center">Scanned</th>
                                        <th>Registered</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse($recent_players as $player)
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="avatar avatar-sm me-2 bg-primary-lt text-primary">
                                                    <i class="ti ti-user"></i>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <span class="fw-bold">{{ $player->player_name }}</span>
                                                    <span class="text-muted small">{{ $player->email }}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="badge badge-outline text-azure">
                                                <i class="ti ti-plane me-1"></i>{{ $player->flight_number }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="badge badge-outline text-{{ $player->score >= 150 ? 'green' : ($player->score >= 51 ? 'cyan' : 'gray') }}">
                                                <i class="ti ti-trophy me-1"></i>{{ $player->score }} pts
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            @if($player->score > 0)
                                                <i class="ti ti-circle-check text-success" style="font-size: 1.5rem;"></i>
                                            @else
                                                <i class="ti ti-circle-x text-muted" style="font-size: 1.5rem;"></i>
                                            @endif
                                        </td>
                                        <td class="text-center">
                                            @if($player->scanned)
                                                <i class="ti ti-qrcode text-success" style="font-size: 1.5rem;"></i>
                                            @else
                                                <i class="ti ti-qrcode text-muted" style="font-size: 1.5rem;"></i>
                                            @endif
                                        </td>
                                        <td>
                                            <span class="text-muted">
                                                <i class="ti ti-clock me-1"></i>{{ $player->created_at->diffForHumans() }}
                                            </span>
                                        </td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td colspan="6" class="text-center text-muted py-5">
                                            <i class="ti ti-users-off" style="font-size: 3rem;"></i>
                                            <p class="mt-2">No players yet</p>
                                        </td>
                                    </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
