import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const backBtn = document.getElementById('back-btn');
    const startScreen = document.getElementById('start-screen');
    const registrationScreen = document.getElementById('registration-screen');
    
    // Initialize International Telephone Input
    const contactInput = document.querySelector("#contact");
    if (contactInput) {
        intlTelInput(contactInput, {
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
            initialCountry: "my", // Default to Malaysia as per context (Innisfree MY)
            separateDialCode: true,
            preferredCountries: ["my", "sg", "id"],
        });
    }

    // Instruction Screen Elements
    const instructionScreen = document.getElementById('instruction-screen');
    const instructionNextBtn = document.getElementById('instruction-next-btn');
    const instructionBackBtn = document.getElementById('instruction-back-btn');
    const registrationForm = document.querySelector('form');

    // Start -> Registration
    if (startBtn && startScreen && registrationScreen) {
        startBtn.addEventListener('click', function() {
            startScreen.style.display = 'none';
            registrationScreen.style.display = 'flex';
        });
    }

    // Registration Back -> Start
    if (backBtn && startScreen && registrationScreen) {
        backBtn.addEventListener('click', function() {
            registrationScreen.style.display = 'none';
            startScreen.style.display = 'block';
        });
    }

    // Registration Submit -> Instructions
    if (registrationForm && instructionScreen) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission
            registrationScreen.style.display = 'none';
            instructionScreen.style.display = 'flex';
        });
    }

    // Instructions Next -> Game (Submit Form)
    if (instructionNextBtn && registrationForm) {
        instructionNextBtn.addEventListener('click', function() {
            registrationForm.submit();
        });
    }

    // Instructions Back -> Registration
    if (instructionBackBtn && instructionScreen && registrationScreen) {
        instructionBackBtn.addEventListener('click', function() {
            instructionScreen.style.display = 'none';
            registrationScreen.style.display = 'flex';
        });
    }
});
