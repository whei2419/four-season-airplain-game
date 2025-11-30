@extends('layouts.admin.app')

@section('content')
<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <h2 class="page-title">Profile Settings</h2>
                <div class="text-muted mt-1">Manage your account information and security</div>
            </div>
        </div>
    </div>
</div>

<div class="page-body">
    <div class="container-xl">
        <div class="row">
            <div class="col-md-8">
                <!-- Profile Information -->
                <div class="card mb-3">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="ti ti-user me-2"></i>Profile Information
                        </h3>
                    </div>
                    <div class="card-body">
                        @include('profile.partials.update-profile-information-form')
                    </div>
                </div>

                <!-- Update Password -->
                <div class="card mb-3">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="ti ti-lock me-2"></i>Update Password
                        </h3>
                    </div>
                    <div class="card-body">
                        @include('profile.partials.update-password-form')
                    </div>
                </div>

                <!-- Delete Account -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="ti ti-alert-triangle me-2"></i>Delete Account
                        </h3>
                    </div>
                    <div class="card-body">
                        @include('profile.partials.delete-user-form')
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <!-- Account Info -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="ti ti-info-circle me-2"></i>Account Information
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label text-muted small">Name</label>
                            <div class="fw-bold">{{ $user->name }}</div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted small">Email</label>
                            <div>{{ $user->email }}</div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted small">Account Created</label>
                            <div>
                                <i class="ti ti-calendar me-1"></i>{{ $user->created_at->format('F d, Y') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
