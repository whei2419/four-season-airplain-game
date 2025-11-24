import 'intl-tel-input/build/css/intlTelInput.css';
import allCountries from 'intl-tel-input/build/js/data';

document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const backBtn = document.getElementById('back-btn');
    const startScreen = document.getElementById('start-screen');
    const registrationScreen = document.getElementById('registration-screen');
    
    // Country Code Modal
    const countryModal = document.getElementById('country-modal');
    const countryTrigger = document.getElementById('country-trigger');
    const selectedFlag = document.getElementById('selected-flag');
    const selectedCode = document.getElementById('selected-code');
    const countrySearch = document.getElementById('country-search');
    const countryListContainer = document.getElementById('country-list');
    const closeModal = document.getElementById('close-country-modal');

    // Populate all countries from intl-tel-input data
    if (countryListContainer && allCountries) {
        allCountries.forEach(country => {
            const countryItem = document.createElement('div');
            countryItem.className = 'country-item';
            countryItem.dataset.flag = `iti__${country.iso2}`;
            countryItem.dataset.code = `+${country.dialCode}`;
            countryItem.dataset.country = country.name;
            
            countryItem.innerHTML = `
                <span class="iti__flag iti__${country.iso2}"></span>
                <span class="country-name">${country.name}</span>
                <span class="country-code">+${country.dialCode}</span>
            `;
            
            countryItem.addEventListener('click', function() {
                const flagClass = this.dataset.flag;
                const code = this.dataset.code;
                
                // Update trigger button
                selectedFlag.className = 'iti__flag ' + flagClass;
                selectedCode.textContent = code;
                
                // Update hidden input
                document.getElementById('country_code').value = code;
                
                countryModal.style.display = 'none';
            });
            
            countryListContainer.appendChild(countryItem);
        });
    }

    const countryList = document.querySelectorAll('.country-item');

    // Open modal
    if (countryTrigger) {
        countryTrigger.addEventListener('click', function() {
            countryModal.style.display = 'flex';
            countrySearch.value = '';
            countrySearch.focus();
            countryList.forEach(item => item.style.display = 'flex');
        });
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            countryModal.style.display = 'none';
        });
    }

    // Close on outside click
    if (countryModal) {
        countryModal.addEventListener('click', function(e) {
            if (e.target === countryModal) {
                countryModal.style.display = 'none';
            }
        });
    }

    // Search functionality
    if (countrySearch) {
        countrySearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            countryList.forEach(item => {
                const countryName = item.dataset.country.toLowerCase();
                const countryCode = item.dataset.code.toLowerCase();
                if (countryName.includes(searchTerm) || countryCode.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
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
