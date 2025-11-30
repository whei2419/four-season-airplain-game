@extends('layouts.admin.app')

@section('content')
<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <h2 class="page-title">Players Management</h2>
                <div class="text-muted mt-1">View and manage all registered players</div>
            </div>
            <div class="col-auto ms-auto">
                <a href="{{ route('admin.players.export', request()->query()) }}" class="btn btn-outline-success">
                    <i class="ti ti-file-download me-2"></i>
                    Export to CSV
                </a>
            </div>
        </div>
    </div>
</div>

<div class="page-body">
    <div class="container-xl">
        <!-- Filters -->
        <div class="card mb-3">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="ti ti-filter me-2"></i>Filters
                </h3>
            </div>
            <div class="card-body">
                <form method="GET" action="{{ route('admin.players') }}">
                    <div class="row g-3 align-items-end">
                        <!-- Search -->
                        <div class="col-md-4">
                            <label class="form-label">
                                <i class="ti ti-search me-1"></i>Search Player
                            </label>
                            <div class="input-icon">
                                <span class="input-icon-addon">
                                    <i class="ti ti-search"></i>
                                </span>
                                <input type="text" name="search" class="form-control" value="{{ request('search') }}" 
                                    placeholder="Name, Email, or Flight #">
                            </div>
                        </div>

                        <!-- Status Filter -->
                        <div class="col-md-3">
                            <label class="form-label">
                                <i class="ti ti-filter me-1"></i>Status
                            </label>
                            <select name="status" class="form-select">
                                <option value="">All Players</option>
                                <option value="played" {{ request('status') == 'played' ? 'selected' : '' }}>
                                    <i class="ti ti-circle-check"></i> Played Game
                                </option>
                                <option value="not_played" {{ request('status') == 'not_played' ? 'selected' : '' }}>Not Played</option>
                                <option value="scanned" {{ request('status') == 'scanned' ? 'selected' : '' }}>QR Scanned</option>
                                <option value="not_scanned" {{ request('status') == 'not_scanned' ? 'selected' : '' }}>QR Not Scanned</option>
                            </select>
                        </div>

                        <!-- Sort -->
                        <div class="col-md-3">
                            <label class="form-label">
                                <i class="ti ti-sort-descending me-1"></i>Sort By
                            </label>
                            <select name="sort_by" class="form-select">
                                <option value="created_at" {{ request('sort_by') == 'created_at' ? 'selected' : '' }}>Registration Date</option>
                                <option value="score" {{ request('sort_by') == 'score' ? 'selected' : '' }}>Score</option>
                                <option value="player_name" {{ request('sort_by') == 'player_name' ? 'selected' : '' }}>Name</option>
                            </select>
                        </div>

                        <!-- Action Buttons -->
                        <div class="col-md-2">
                            <div class="btn-list">
                                <button type="submit" class="btn btn-primary w-100">
                                    <i class="ti ti-search me-1"></i>Search
                                </button>
                                @if(request()->hasAny(['search', 'status', 'sort_by']))
                                <a href="{{ route('admin.players') }}" class="btn btn-ghost-secondary w-100">
                                    <i class="ti ti-x me-1"></i>Clear
                                </a>
                                @endif
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Players Table -->
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-vcenter">
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Contact</th>
                                <th>Flight</th>
                                <th>Score</th>
                                <th class="text-center">Played</th>
                                <th class="text-center">Scanned</th>
                                <th>Registered</th>
                                <th class="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($players as $player)
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
                                    <span class="text-muted">{{ $player->contact ?? 'N/A' }}</span>
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
                                        <div>
                                            <i class="ti ti-qrcode text-success" style="font-size: 1.5rem;"></i>
                                            <div class="text-muted small">{{ $player->scanned_at->format('M d, H:i') }}</div>
                                        </div>
                                    @else
                                        <i class="ti ti-qrcode text-muted" style="font-size: 1.5rem;"></i>
                                    @endif
                                </td>
                                <td>
                                    <span class="text-muted">
                                        <i class="ti ti-clock me-1"></i>{{ $player->created_at->format('M d, Y H:i') }}
                                    </span>
                                </td>
                                <td class="text-center">
                                    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#playerModal{{ $player->id }}">
                                        <i class="ti ti-eye me-1"></i>View
                                    </button>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="8" class="text-center text-muted py-5">
                                    <i class="ti ti-users-off" style="font-size: 3rem;"></i>
                                    <p class="mt-2">No players found</p>
                                </td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="mt-3">
                    {{ $players->links() }}
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Player Modals -->
@foreach($players as $player)
<div class="modal fade" id="playerModal{{ $player->id }}" tabindex="-1" aria-labelledby="playerModalLabel{{ $player->id }}" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="playerModalLabel{{ $player->id }}">
                    <i class="ti ti-user me-2"></i>Player Details
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <!-- Player Information -->
                    <div class="col-md-7">
                        <h6 class="mb-3 text-muted">
                            <i class="ti ti-info-circle me-1"></i>Personal Information
                        </h6>
                        <div class="mb-3">
                            <label class="form-label text-muted small">Player Name</label>
                            <div class="fw-bold">{{ $player->player_name }}</div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted small">Email</label>
                            <div>{{ $player->email }}</div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted small">Contact Number</label>
                            <div>{{ $player->contact ?? 'N/A' }}</div>
                        </div>
                        
                        <hr class="my-4">
                        
                        <h6 class="mb-3 text-muted">
                            <i class="ti ti-device-gamepad me-1"></i>Game Information
                        </h6>
                        <div class="row">
                            <div class="col-6 mb-3">
                                <label class="form-label text-muted small">Flight Number</label>
                                <div>
                                    <span class="badge badge-outline text-azure">
                                        <i class="ti ti-plane me-1"></i>{{ $player->flight_number }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-6 mb-3">
                                <label class="form-label text-muted small">Score</label>
                                <div>
                                    <span class="badge badge-outline text-{{ $player->score >= 150 ? 'green' : ($player->score >= 51 ? 'cyan' : 'gray') }}">
                                        <i class="ti ti-trophy me-1"></i>{{ $player->score }} points
                                    </span>
                                </div>
                            </div>
                            <div class="col-6 mb-3">
                                <label class="form-label text-muted small">Game Played</label>
                                <div>
                                    @if($player->score > 0)
                                        <span class="badge badge-outline text-success">
                                            <i class="ti ti-check me-1"></i>Yes
                                        </span>
                                    @else
                                        <span class="badge badge-outline text-secondary">
                                            <i class="ti ti-x me-1"></i>No
                                        </span>
                                    @endif
                                </div>
                            </div>
                            <div class="col-6 mb-3">
                                <label class="form-label text-muted small">QR Scanned</label>
                                <div>
                                    @if($player->scanned)
                                        <span class="badge badge-outline text-success">
                                            <i class="ti ti-qrcode me-1"></i>Yes
                                        </span>
                                        <div class="text-muted small mt-1">{{ $player->scanned_at->format('M d, Y H:i') }}</div>
                                    @else
                                        <span class="badge badge-outline text-secondary">
                                            <i class="ti ti-qrcode me-1"></i>No
                                        </span>
                                    @endif
                                </div>
                            </div>
                            <div class="col-12 mb-3">
                                <label class="form-label text-muted small">Registration Date</label>
                                <div>
                                    <i class="ti ti-calendar me-1"></i>{{ $player->created_at->format('F d, Y') }}
                                    <span class="text-muted ms-2">{{ $player->created_at->format('h:i A') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- QR Code -->
                    <div class="col-md-5">
                        <h6 class="mb-3 text-muted">
                            <i class="ti ti-qrcode me-1"></i>Reward QR Code
                        </h6>
                        @if($player->qr_code_url)
                            <div class="text-center">
                                <div class="card">
                                    <div class="card-body">
                                        <img src="{{ $player->qr_code_url }}" alt="QR Code" class="img-fluid" style="max-width: 300px;">
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <a href="{{ route('game.reward', $player->reward_token) }}" target="_blank" class="btn btn-sm btn-outline-primary">
                                        <i class="ti ti-external-link me-1"></i>Open Reward Page
                                    </a>
                                </div>
                            </div>
                        @else
                            <div class="text-center text-muted py-5">
                                <i class="ti ti-qrcode-off" style="font-size: 3rem;"></i>
                                <p class="mt-2">QR Code not generated yet</p>
                                <small>Player needs to complete the game first</small>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endforeach

@endsection
