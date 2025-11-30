<div class="alert alert-danger" role="alert">
    <div class="d-flex">
        <div>
            <i class="ti ti-alert-triangle me-2"></i>
        </div>
        <div>
            <h4 class="alert-title">Permanent Action</h4>
            <div class="text-muted">
                Once your account is deleted, all of its resources and data will be permanently deleted. 
                Before deleting your account, please download any data or information that you wish to retain.
            </div>
        </div>
    </div>
</div>

<div class="text-end">
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAccountModal">
        <i class="ti ti-trash me-2"></i>
        Delete Account
    </button>
</div>

<!-- Delete Account Modal -->
<div class="modal fade" id="deleteAccountModal" tabindex="-1" aria-labelledby="deleteAccountModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteAccountModalLabel">
                    <i class="ti ti-alert-triangle me-2 text-danger"></i>Confirm Account Deletion
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form method="post" action="{{ route('profile.destroy') }}">
                @csrf
                @method('delete')
                
                <div class="modal-body">
                    <p class="text-danger fw-bold mb-3">
                        Are you sure you want to delete your account?
                    </p>
                    <p class="text-muted mb-3">
                        Once your account is deleted, all of its resources and data will be permanently deleted. 
                        Please enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div class="mb-3">
                        <label class="form-label">
                            <i class="ti ti-lock me-1"></i>Password
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            class="form-control @error('password', 'userDeletion') is-invalid @enderror" 
                            placeholder="Enter your password"
                            required
                        >
                        @error('password', 'userDeletion')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="ti ti-x me-1"></i>Cancel
                    </button>
                    <button type="submit" class="btn btn-danger">
                        <i class="ti ti-trash me-2"></i>
                        Delete Account
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

@if($errors->userDeletion->isNotEmpty())
<script>
    document.addEventListener('DOMContentLoaded', function() {
        var myModal = new bootstrap.Modal(document.getElementById('deleteAccountModal'));
        myModal.show();
    });
</script>
@endif
