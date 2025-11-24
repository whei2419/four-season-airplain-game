import 'intl-tel-input/build/css/intlTelInput.css';

// Hardcoded country list with all countries
const allCountries = [
    { name: "Afghanistan", iso2: "af", dialCode: "93" },
    { name: "Albania", iso2: "al", dialCode: "355" },
    { name: "Algeria", iso2: "dz", dialCode: "213" },
    { name: "American Samoa", iso2: "as", dialCode: "1684" },
    { name: "Andorra", iso2: "ad", dialCode: "376" },
    { name: "Angola", iso2: "ao", dialCode: "244" },
    { name: "Anguilla", iso2: "ai", dialCode: "1264" },
    { name: "Antigua and Barbuda", iso2: "ag", dialCode: "1268" },
    { name: "Argentina", iso2: "ar", dialCode: "54" },
    { name: "Armenia", iso2: "am", dialCode: "374" },
    { name: "Aruba", iso2: "aw", dialCode: "297" },
    { name: "Australia", iso2: "au", dialCode: "61" },
    { name: "Austria", iso2: "at", dialCode: "43" },
    { name: "Azerbaijan", iso2: "az", dialCode: "994" },
    { name: "Bahamas", iso2: "bs", dialCode: "1242" },
    { name: "Bahrain", iso2: "bh", dialCode: "973" },
    { name: "Bangladesh", iso2: "bd", dialCode: "880" },
    { name: "Barbados", iso2: "bb", dialCode: "1246" },
    { name: "Belarus", iso2: "by", dialCode: "375" },
    { name: "Belgium", iso2: "be", dialCode: "32" },
    { name: "Belize", iso2: "bz", dialCode: "501" },
    { name: "Benin", iso2: "bj", dialCode: "229" },
    { name: "Bermuda", iso2: "bm", dialCode: "1441" },
    { name: "Bhutan", iso2: "bt", dialCode: "975" },
    { name: "Bolivia", iso2: "bo", dialCode: "591" },
    { name: "Bosnia and Herzegovina", iso2: "ba", dialCode: "387" },
    { name: "Botswana", iso2: "bw", dialCode: "267" },
    { name: "Brazil", iso2: "br", dialCode: "55" },
    { name: "British Indian Ocean Territory", iso2: "io", dialCode: "246" },
    { name: "British Virgin Islands", iso2: "vg", dialCode: "1284" },
    { name: "Brunei", iso2: "bn", dialCode: "673" },
    { name: "Bulgaria", iso2: "bg", dialCode: "359" },
    { name: "Burkina Faso", iso2: "bf", dialCode: "226" },
    { name: "Burundi", iso2: "bi", dialCode: "257" },
    { name: "Cambodia", iso2: "kh", dialCode: "855" },
    { name: "Cameroon", iso2: "cm", dialCode: "237" },
    { name: "Canada", iso2: "ca", dialCode: "1" },
    { name: "Cape Verde", iso2: "cv", dialCode: "238" },
    { name: "Caribbean Netherlands", iso2: "bq", dialCode: "599" },
    { name: "Cayman Islands", iso2: "ky", dialCode: "1345" },
    { name: "Central African Republic", iso2: "cf", dialCode: "236" },
    { name: "Chad", iso2: "td", dialCode: "235" },
    { name: "Chile", iso2: "cl", dialCode: "56" },
    { name: "China", iso2: "cn", dialCode: "86" },
    { name: "Christmas Island", iso2: "cx", dialCode: "61" },
    { name: "Cocos (Keeling) Islands", iso2: "cc", dialCode: "61" },
    { name: "Colombia", iso2: "co", dialCode: "57" },
    { name: "Comoros", iso2: "km", dialCode: "269" },
    { name: "Congo (DRC)", iso2: "cd", dialCode: "243" },
    { name: "Congo (Republic)", iso2: "cg", dialCode: "242" },
    { name: "Cook Islands", iso2: "ck", dialCode: "682" },
    { name: "Costa Rica", iso2: "cr", dialCode: "506" },
    { name: "Côte d'Ivoire", iso2: "ci", dialCode: "225" },
    { name: "Croatia", iso2: "hr", dialCode: "385" },
    { name: "Cuba", iso2: "cu", dialCode: "53" },
    { name: "Curaçao", iso2: "cw", dialCode: "599" },
    { name: "Cyprus", iso2: "cy", dialCode: "357" },
    { name: "Czech Republic", iso2: "cz", dialCode: "420" },
    { name: "Denmark", iso2: "dk", dialCode: "45" },
    { name: "Djibouti", iso2: "dj", dialCode: "253" },
    { name: "Dominica", iso2: "dm", dialCode: "1767" },
    { name: "Dominican Republic", iso2: "do", dialCode: "1" },
    { name: "Ecuador", iso2: "ec", dialCode: "593" },
    { name: "Egypt", iso2: "eg", dialCode: "20" },
    { name: "El Salvador", iso2: "sv", dialCode: "503" },
    { name: "Equatorial Guinea", iso2: "gq", dialCode: "240" },
    { name: "Eritrea", iso2: "er", dialCode: "291" },
    { name: "Estonia", iso2: "ee", dialCode: "372" },
    { name: "Ethiopia", iso2: "et", dialCode: "251" },
    { name: "Falkland Islands", iso2: "fk", dialCode: "500" },
    { name: "Faroe Islands", iso2: "fo", dialCode: "298" },
    { name: "Fiji", iso2: "fj", dialCode: "679" },
    { name: "Finland", iso2: "fi", dialCode: "358" },
    { name: "France", iso2: "fr", dialCode: "33" },
    { name: "French Guiana", iso2: "gf", dialCode: "594" },
    { name: "French Polynesia", iso2: "pf", dialCode: "689" },
    { name: "Gabon", iso2: "ga", dialCode: "241" },
    { name: "Gambia", iso2: "gm", dialCode: "220" },
    { name: "Georgia", iso2: "ge", dialCode: "995" },
    { name: "Germany", iso2: "de", dialCode: "49" },
    { name: "Ghana", iso2: "gh", dialCode: "233" },
    { name: "Gibraltar", iso2: "gi", dialCode: "350" },
    { name: "Greece", iso2: "gr", dialCode: "30" },
    { name: "Greenland", iso2: "gl", dialCode: "299" },
    { name: "Grenada", iso2: "gd", dialCode: "1473" },
    { name: "Guadeloupe", iso2: "gp", dialCode: "590" },
    { name: "Guam", iso2: "gu", dialCode: "1671" },
    { name: "Guatemala", iso2: "gt", dialCode: "502" },
    { name: "Guernsey", iso2: "gg", dialCode: "44" },
    { name: "Guinea", iso2: "gn", dialCode: "224" },
    { name: "Guinea-Bissau", iso2: "gw", dialCode: "245" },
    { name: "Guyana", iso2: "gy", dialCode: "592" },
    { name: "Haiti", iso2: "ht", dialCode: "509" },
    { name: "Honduras", iso2: "hn", dialCode: "504" },
    { name: "Hong Kong", iso2: "hk", dialCode: "852" },
    { name: "Hungary", iso2: "hu", dialCode: "36" },
    { name: "Iceland", iso2: "is", dialCode: "354" },
    { name: "India", iso2: "in", dialCode: "91" },
    { name: "Indonesia", iso2: "id", dialCode: "62" },
    { name: "Iran", iso2: "ir", dialCode: "98" },
    { name: "Iraq", iso2: "iq", dialCode: "964" },
    { name: "Ireland", iso2: "ie", dialCode: "353" },
    { name: "Isle of Man", iso2: "im", dialCode: "44" },
    { name: "Israel", iso2: "il", dialCode: "972" },
    { name: "Italy", iso2: "it", dialCode: "39" },
    { name: "Jamaica", iso2: "jm", dialCode: "1876" },
    { name: "Japan", iso2: "jp", dialCode: "81" },
    { name: "Jersey", iso2: "je", dialCode: "44" },
    { name: "Jordan", iso2: "jo", dialCode: "962" },
    { name: "Kazakhstan", iso2: "kz", dialCode: "7" },
    { name: "Kenya", iso2: "ke", dialCode: "254" },
    { name: "Kiribati", iso2: "ki", dialCode: "686" },
    { name: "Kosovo", iso2: "xk", dialCode: "383" },
    { name: "Kuwait", iso2: "kw", dialCode: "965" },
    { name: "Kyrgyzstan", iso2: "kg", dialCode: "996" },
    { name: "Laos", iso2: "la", dialCode: "856" },
    { name: "Latvia", iso2: "lv", dialCode: "371" },
    { name: "Lebanon", iso2: "lb", dialCode: "961" },
    { name: "Lesotho", iso2: "ls", dialCode: "266" },
    { name: "Liberia", iso2: "lr", dialCode: "231" },
    { name: "Libya", iso2: "ly", dialCode: "218" },
    { name: "Liechtenstein", iso2: "li", dialCode: "423" },
    { name: "Lithuania", iso2: "lt", dialCode: "370" },
    { name: "Luxembourg", iso2: "lu", dialCode: "352" },
    { name: "Macau", iso2: "mo", dialCode: "853" },
    { name: "Macedonia", iso2: "mk", dialCode: "389" },
    { name: "Madagascar", iso2: "mg", dialCode: "261" },
    { name: "Malawi", iso2: "mw", dialCode: "265" },
    { name: "Malaysia", iso2: "my", dialCode: "60" },
    { name: "Maldives", iso2: "mv", dialCode: "960" },
    { name: "Mali", iso2: "ml", dialCode: "223" },
    { name: "Malta", iso2: "mt", dialCode: "356" },
    { name: "Marshall Islands", iso2: "mh", dialCode: "692" },
    { name: "Martinique", iso2: "mq", dialCode: "596" },
    { name: "Mauritania", iso2: "mr", dialCode: "222" },
    { name: "Mauritius", iso2: "mu", dialCode: "230" },
    { name: "Mayotte", iso2: "yt", dialCode: "262" },
    { name: "Mexico", iso2: "mx", dialCode: "52" },
    { name: "Micronesia", iso2: "fm", dialCode: "691" },
    { name: "Moldova", iso2: "md", dialCode: "373" },
    { name: "Monaco", iso2: "mc", dialCode: "377" },
    { name: "Mongolia", iso2: "mn", dialCode: "976" },
    { name: "Montenegro", iso2: "me", dialCode: "382" },
    { name: "Montserrat", iso2: "ms", dialCode: "1664" },
    { name: "Morocco", iso2: "ma", dialCode: "212" },
    { name: "Mozambique", iso2: "mz", dialCode: "258" },
    { name: "Myanmar (Burma)", iso2: "mm", dialCode: "95" },
    { name: "Namibia", iso2: "na", dialCode: "264" },
    { name: "Nauru", iso2: "nr", dialCode: "674" },
    { name: "Nepal", iso2: "np", dialCode: "977" },
    { name: "Netherlands", iso2: "nl", dialCode: "31" },
    { name: "New Caledonia", iso2: "nc", dialCode: "687" },
    { name: "New Zealand", iso2: "nz", dialCode: "64" },
    { name: "Nicaragua", iso2: "ni", dialCode: "505" },
    { name: "Niger", iso2: "ne", dialCode: "227" },
    { name: "Nigeria", iso2: "ng", dialCode: "234" },
    { name: "Niue", iso2: "nu", dialCode: "683" },
    { name: "Norfolk Island", iso2: "nf", dialCode: "672" },
    { name: "North Korea", iso2: "kp", dialCode: "850" },
    { name: "Northern Mariana Islands", iso2: "mp", dialCode: "1670" },
    { name: "Norway", iso2: "no", dialCode: "47" },
    { name: "Oman", iso2: "om", dialCode: "968" },
    { name: "Pakistan", iso2: "pk", dialCode: "92" },
    { name: "Palau", iso2: "pw", dialCode: "680" },
    { name: "Palestine", iso2: "ps", dialCode: "970" },
    { name: "Panama", iso2: "pa", dialCode: "507" },
    { name: "Papua New Guinea", iso2: "pg", dialCode: "675" },
    { name: "Paraguay", iso2: "py", dialCode: "595" },
    { name: "Peru", iso2: "pe", dialCode: "51" },
    { name: "Philippines", iso2: "ph", dialCode: "63" },
    { name: "Poland", iso2: "pl", dialCode: "48" },
    { name: "Portugal", iso2: "pt", dialCode: "351" },
    { name: "Puerto Rico", iso2: "pr", dialCode: "1" },
    { name: "Qatar", iso2: "qa", dialCode: "974" },
    { name: "Réunion", iso2: "re", dialCode: "262" },
    { name: "Romania", iso2: "ro", dialCode: "40" },
    { name: "Russia", iso2: "ru", dialCode: "7" },
    { name: "Rwanda", iso2: "rw", dialCode: "250" },
    { name: "Saint Barthélemy", iso2: "bl", dialCode: "590" },
    { name: "Saint Helena", iso2: "sh", dialCode: "290" },
    { name: "Saint Kitts and Nevis", iso2: "kn", dialCode: "1869" },
    { name: "Saint Lucia", iso2: "lc", dialCode: "1758" },
    { name: "Saint Martin", iso2: "mf", dialCode: "590" },
    { name: "Saint Pierre and Miquelon", iso2: "pm", dialCode: "508" },
    { name: "Saint Vincent and the Grenadines", iso2: "vc", dialCode: "1784" },
    { name: "Samoa", iso2: "ws", dialCode: "685" },
    { name: "San Marino", iso2: "sm", dialCode: "378" },
    { name: "São Tomé and Príncipe", iso2: "st", dialCode: "239" },
    { name: "Saudi Arabia", iso2: "sa", dialCode: "966" },
    { name: "Senegal", iso2: "sn", dialCode: "221" },
    { name: "Serbia", iso2: "rs", dialCode: "381" },
    { name: "Seychelles", iso2: "sc", dialCode: "248" },
    { name: "Sierra Leone", iso2: "sl", dialCode: "232" },
    { name: "Singapore", iso2: "sg", dialCode: "65" },
    { name: "Sint Maarten", iso2: "sx", dialCode: "1721" },
    { name: "Slovakia", iso2: "sk", dialCode: "421" },
    { name: "Slovenia", iso2: "si", dialCode: "386" },
    { name: "Solomon Islands", iso2: "sb", dialCode: "677" },
    { name: "Somalia", iso2: "so", dialCode: "252" },
    { name: "South Africa", iso2: "za", dialCode: "27" },
    { name: "South Korea", iso2: "kr", dialCode: "82" },
    { name: "South Sudan", iso2: "ss", dialCode: "211" },
    { name: "Spain", iso2: "es", dialCode: "34" },
    { name: "Sri Lanka", iso2: "lk", dialCode: "94" },
    { name: "Sudan", iso2: "sd", dialCode: "249" },
    { name: "Suriname", iso2: "sr", dialCode: "597" },
    { name: "Svalbard and Jan Mayen", iso2: "sj", dialCode: "47" },
    { name: "Swaziland", iso2: "sz", dialCode: "268" },
    { name: "Sweden", iso2: "se", dialCode: "46" },
    { name: "Switzerland", iso2: "ch", dialCode: "41" },
    { name: "Syria", iso2: "sy", dialCode: "963" },
    { name: "Taiwan", iso2: "tw", dialCode: "886" },
    { name: "Tajikistan", iso2: "tj", dialCode: "992" },
    { name: "Tanzania", iso2: "tz", dialCode: "255" },
    { name: "Thailand", iso2: "th", dialCode: "66" },
    { name: "Timor-Leste", iso2: "tl", dialCode: "670" },
    { name: "Togo", iso2: "tg", dialCode: "228" },
    { name: "Tokelau", iso2: "tk", dialCode: "690" },
    { name: "Tonga", iso2: "to", dialCode: "676" },
    { name: "Trinidad and Tobago", iso2: "tt", dialCode: "1868" },
    { name: "Tunisia", iso2: "tn", dialCode: "216" },
    { name: "Turkey", iso2: "tr", dialCode: "90" },
    { name: "Turkmenistan", iso2: "tm", dialCode: "993" },
    { name: "Turks and Caicos Islands", iso2: "tc", dialCode: "1649" },
    { name: "Tuvalu", iso2: "tv", dialCode: "688" },
    { name: "U.S. Virgin Islands", iso2: "vi", dialCode: "1340" },
    { name: "Uganda", iso2: "ug", dialCode: "256" },
    { name: "Ukraine", iso2: "ua", dialCode: "380" },
    { name: "United Arab Emirates", iso2: "ae", dialCode: "971" },
    { name: "United Kingdom", iso2: "gb", dialCode: "44" },
    { name: "United States", iso2: "us", dialCode: "1" },
    { name: "Uruguay", iso2: "uy", dialCode: "598" },
    { name: "Uzbekistan", iso2: "uz", dialCode: "998" },
    { name: "Vanuatu", iso2: "vu", dialCode: "678" },
    { name: "Vatican City", iso2: "va", dialCode: "39" },
    { name: "Venezuela", iso2: "ve", dialCode: "58" },
    { name: "Vietnam", iso2: "vn", dialCode: "84" },
    { name: "Wallis and Futuna", iso2: "wf", dialCode: "681" },
    { name: "Western Sahara", iso2: "eh", dialCode: "212" },
    { name: "Yemen", iso2: "ye", dialCode: "967" },
    { name: "Zambia", iso2: "zm", dialCode: "260" },
    { name: "Zimbabwe", iso2: "zw", dialCode: "263" }
];

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
    const contactInput = document.getElementById('contact');

    // Only allow numbers in contact input
    if (contactInput) {
        contactInput.addEventListener('keypress', function(e) {
            // Allow only numbers (0-9) and control keys
            const charCode = e.which ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                e.preventDefault();
                return false;
            }
            return true;
        });

        // Prevent pasting non-numeric content
        contactInput.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const numbersOnly = pastedText.replace(/\D/g, '');
            document.execCommand('insertText', false, numbersOnly);
        });

        // Remove any non-numeric characters on input
        contactInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/\D/g, '');
        });
    }

    // Virtual Keyboard Functionality
    const keyboardKeys = document.querySelectorAll('.keyboard-visual .key');
    let activeInput = null;
    let isShiftActive = false;
    let isSpecialChars = false;

    // Track which input is focused
    const inputs = document.querySelectorAll('.registration-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            activeInput = this;
        });
    });

    // Function to update keyboard layout
    function updateKeyboardLayout() {
        const rows = document.querySelectorAll('.keyboard-visual .keyboard-row');
        
        if (isSpecialChars) {
            // Special characters layout
            rows[0].innerHTML = `
                <div class="key">!</div>
                <div class="key">@</div>
                <div class="key">#</div>
                <div class="key">$</div>
                <div class="key">%</div>
                <div class="key">^</div>
                <div class="key">&</div>
                <div class="key">*</div>
                <div class="key">(</div>
                <div class="key">)</div>
            `;
            rows[1].innerHTML = `
                <div class="key">-</div>
                <div class="key">_</div>
                <div class="key">=</div>
                <div class="key">+</div>
                <div class="key">[</div>
                <div class="key">]</div>
                <div class="key">{</div>
                <div class="key">}</div>
                <div class="key">|</div>
                <div class="key">\\</div>
            `;
            rows[2].innerHTML = `
                <div class="key">:</div>
                <div class="key">;</div>
                <div class="key">"</div>
                <div class="key">'</div>
                <div class="key"><</div>
                <div class="key">></div>
                <div class="key">,</div>
                <div class="key">.</div>
                <div class="key">?</div>
                <div class="key">/</div>
            `;
            rows[3].innerHTML = `
                <div class="key wide">~\`</div>
                <div class="key">.</div>
                <div class="key">@</div>
                <div class="key">.com</div>
                <div class="key">.my</div>
                <div class="key wide">⌫</div>
            `;
            rows[4].innerHTML = `
                <div class="key wider">ABC</div>
                <div class="key extra-wide">Space</div>
                <div class="key wider">@</div>
            `;
        } else {
            // Default QWERTY layout
            rows[0].innerHTML = `
                <div class="key">1</div>
                <div class="key">2</div>
                <div class="key">3</div>
                <div class="key">4</div>
                <div class="key">5</div>
                <div class="key">6</div>
                <div class="key">7</div>
                <div class="key">8</div>
                <div class="key">9</div>
                <div class="key">0</div>
            `;
            rows[1].innerHTML = `
                <div class="key">Q</div>
                <div class="key">W</div>
                <div class="key">E</div>
                <div class="key">R</div>
                <div class="key">T</div>
                <div class="key">Y</div>
                <div class="key">U</div>
                <div class="key">I</div>
                <div class="key">O</div>
                <div class="key">P</div>
            `;
            rows[2].innerHTML = `
                <div class="key">A</div>
                <div class="key">S</div>
                <div class="key">D</div>
                <div class="key">F</div>
                <div class="key">G</div>
                <div class="key">H</div>
                <div class="key">J</div>
                <div class="key">K</div>
                <div class="key">L</div>
            `;
            rows[3].innerHTML = `
                <div class="key wide">Shift</div>
                <div class="key">Z</div>
                <div class="key">X</div>
                <div class="key">C</div>
                <div class="key">V</div>
                <div class="key">B</div>
                <div class="key">N</div>
                <div class="key">M</div>
                <div class="key wide">⌫</div>
            `;
            rows[4].innerHTML = `
                <div class="key wider">!@#</div>
                <div class="key extra-wide">Space</div>
                <div class="key wider">@</div>
            `;
        }
        
        // Reattach event listeners to new keys
        attachKeyboardListeners();
    }

    // Handle keyboard key clicks
    function attachKeyboardListeners() {
        const keys = document.querySelectorAll('.keyboard-visual .key');
        keys.forEach(key => {
            key.addEventListener('click', function() {
                if (!activeInput) return;

                const keyText = this.textContent;

                if (keyText === 'Shift') {
                    isShiftActive = !isShiftActive;
                    this.style.background = isShiftActive ? '#3BB776' : 'white';
                    this.style.color = isShiftActive ? 'white' : '#3BB776';
                } else if (keyText === '⌫') {
                    // Backspace
                    activeInput.value = activeInput.value.slice(0, -1);
                } else if (keyText === 'Space') {
                    activeInput.value += ' ';
                } else if (keyText === '!@#') {
                    // Switch to special characters
                    isSpecialChars = true;
                    updateKeyboardLayout();
                } else if (keyText === 'ABC') {
                    // Switch back to letters
                    isSpecialChars = false;
                    updateKeyboardLayout();
                } else if (keyText.length <= 4) {
                    // Regular character or multi-char like .com
                    let char = keyText;
                    if (keyText.length === 1 && /[a-zA-Z]/.test(keyText)) {
                        char = isShiftActive ? keyText.toUpperCase() : keyText.toLowerCase();
                    }
                    activeInput.value += char;
                    
                    // Reset shift after typing
                    if (isShiftActive && keyText.length === 1) {
                        isShiftActive = false;
                        const shiftKey = document.querySelector('.key.wide');
                        if (shiftKey && shiftKey.textContent === 'Shift') {
                            shiftKey.style.background = 'white';
                            shiftKey.style.color = '#3BB776';
                        }
                    }
                }

                // Trigger input event for validation
                activeInput.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    // Initial attachment
    attachKeyboardListeners();

    // Populate all countries
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
            
            // Auto-focus on name input when registration opens
            const nameInput = document.getElementById('name');
            if (nameInput) {
                setTimeout(() => {
                    nameInput.focus();
                    activeInput = nameInput;
                }, 100);
            }
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
