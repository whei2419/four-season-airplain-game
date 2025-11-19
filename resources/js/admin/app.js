// Admin JavaScript
import '@tabler/core';

// Initialize Tabler components
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin panel loaded');
    
    // Auto-dismiss alerts
    const alerts = document.querySelectorAll('.alert-dismissible');
    alerts.forEach(alert => {
        setTimeout(() => {
            const closeBtn = alert.querySelector('.btn-close');
            if (closeBtn) closeBtn.click();
        }, 5000);
    });
});
