document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const backBtn = document.getElementById('back-btn');
    const startScreen = document.getElementById('start-screen');
    const registrationScreen = document.getElementById('registration-screen');

    if (startBtn && startScreen && registrationScreen) {
        startBtn.addEventListener('click', function() {
            startScreen.style.display = 'none';
            registrationScreen.style.display = 'flex';
        });
    }

    if (backBtn && startScreen && registrationScreen) {
        backBtn.addEventListener('click', function() {
            registrationScreen.style.display = 'none';
            startScreen.style.display = 'block';
        });
    }
});
