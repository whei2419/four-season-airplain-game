<p class="text-muted mb-3">
    Ensure your account is using a long, random password to stay secure.
</p>

<form method="post" action="{{ route('password.update') }}">
    @csrf
    @method('put')

    <div class="mb-3">
        <label class="form-label">
            <i class="ti ti-lock me-1"></i>Current Password
        </label>
        <input 
            type="password" 
            name="current_password" 
            class="form-control @error('current_password', 'updatePassword') is-invalid @enderror" 
            autocomplete="current-password"
        >
        @error('current_password', 'updatePassword')
            <div class="invalid-feedback">{{ $message }}</div>
        @enderror
    </div>

    <div class="mb-3">
        <label class="form-label">
            <i class="ti ti-key me-1"></i>New Password
        </label>
        <input 
            type="password" 
            name="password" 
            class="form-control @error('password', 'updatePassword') is-invalid @enderror" 
            autocomplete="new-password"
        >
        @error('password', 'updatePassword')
            <div class="invalid-feedback">{{ $message }}</div>
        @enderror
    </div>

    <div class="mb-3">
        <label class="form-label">
            <i class="ti ti-key me-1"></i>Confirm Password
        </label>
        <input 
            type="password" 
            name="password_confirmation" 
            class="form-control @error('password_confirmation', 'updatePassword') is-invalid @enderror" 
            autocomplete="new-password"
        >
        @error('password_confirmation', 'updatePassword')
            <div class="invalid-feedback">{{ $message }}</div>
        @enderror
    </div>

    <div class="text-end">
        @if (session('status') === 'password-updated')
            <span class="text-success me-3">
                <i class="ti ti-check me-1"></i>Password updated successfully!
            </span>
        @endif
        <button type="submit" class="btn btn-primary">
            <i class="ti ti-device-floppy me-2"></i>
            Update Password
        </button>
    </div>
</form>
