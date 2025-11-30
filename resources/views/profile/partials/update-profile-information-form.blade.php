<form id="send-verification" method="post" action="{{ route('verification.send') }}">
    @csrf
</form>

<form method="post" action="{{ route('profile.update') }}">
    @csrf
    @method('patch')

    <div class="mb-3">
        <label class="form-label">
            <i class="ti ti-user me-1"></i>Name
        </label>
        <input 
            type="text" 
            name="name" 
            class="form-control @error('name') is-invalid @enderror" 
            value="{{ old('name', $user->name) }}" 
            required 
            autofocus 
            autocomplete="name"
        >
        @error('name')
            <div class="invalid-feedback">{{ $message }}</div>
        @enderror
    </div>

    <div class="mb-3">
        <label class="form-label">
            <i class="ti ti-mail me-1"></i>Email
        </label>
        <input 
            type="email" 
            name="email" 
            class="form-control @error('email') is-invalid @enderror" 
            value="{{ old('email', $user->email) }}" 
            required 
            autocomplete="username"
        >
        @error('email')
            <div class="invalid-feedback">{{ $message }}</div>
        @enderror

        @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail())
            <div class="alert alert-warning mt-2" role="alert">
                <i class="ti ti-alert-circle me-2"></i>
                Your email address is unverified.
                <button form="send-verification" class="btn btn-sm btn-warning ms-2">
                    Click here to re-send the verification email.
                </button>
            </div>

            @if (session('status') === 'verification-link-sent')
                <div class="alert alert-success mt-2" role="alert">
                    <i class="ti ti-check me-2"></i>
                    A new verification link has been sent to your email address.
                </div>
            @endif
        @endif
    </div>

    <div class="text-end">
        @if (session('status') === 'profile-updated')
            <span class="text-success me-3">
                <i class="ti ti-check me-1"></i>Saved successfully!
            </span>
        @endif
        <button type="submit" class="btn btn-primary">
            <i class="ti ti-device-floppy me-2"></i>
            Save Changes
        </button>
    </div>
</form>
