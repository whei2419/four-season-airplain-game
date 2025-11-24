import './bootstrap';

import Alpine from 'alpinejs';
import SnowEffect from './snow';

window.Alpine = Alpine;

Alpine.start();

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Snow Effect if the container exists
    if (document.getElementById('snow-container')) {
        new SnowEffect('snow-container');
    }
});
