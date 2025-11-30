// Sound Manager - Handle all game audio
class SoundManager {
    constructor() {
        this.sounds = {};
        this.bgmPlaying = false;
        this.muted = false;
        this.bgmVolume = 0.3; // Background music volume (30%)
        this.sfxVolume = 0.5; // Sound effects volume (50%)
        
        this.loadSounds();
    }

    loadSounds() {
        // Use paths from Laravel backend (window.soundAssets)
        const soundPaths = window.soundAssets || {
            bgm: '/assets/sounds/bgm.mp3',
            button: '/assets/sounds/Button.mp3',
            deduct: '/assets/sounds/Deduct.mp3',
            flyOff: '/assets/sounds/Fly Off.mp3',
            landing: '/assets/sounds/Landing 00.18.mp3',
            score: '/assets/sounds/Score.mp3',
            winning: '/assets/sounds/Winning.mp3'
        };

        for (const [key, path] of Object.entries(soundPaths)) {
            const audio = new Audio(path);
            audio.preload = 'auto';
            
            // Set volume based on type
            if (key === 'bgm') {
                audio.loop = true;
                audio.volume = this.bgmVolume;
            } else {
                audio.volume = this.sfxVolume;
            }
            
            this.sounds[key] = audio;
        }
    }

    play(soundName) {
        if (this.muted || !this.sounds[soundName]) return;
        
        const sound = this.sounds[soundName];
        sound.currentTime = 0;
        sound.play().catch(err => console.log('Sound play failed:', err));
    }

    playBGM() {
        if (this.muted || this.bgmPlaying) return;
        
        const bgm = this.sounds.bgm;
        if (bgm) {
            bgm.play().catch(err => console.log('BGM play failed:', err));
            this.bgmPlaying = true;
        }
    }

    stopBGM() {
        const bgm = this.sounds.bgm;
        if (bgm) {
            bgm.pause();
            bgm.currentTime = 0;
            this.bgmPlaying = false;
        }
    }

    pauseBGM() {
        const bgm = this.sounds.bgm;
        if (bgm) {
            bgm.pause();
            this.bgmPlaying = false;
        }
    }

    resumeBGM() {
        if (this.muted) return;
        
        const bgm = this.sounds.bgm;
        if (bgm && !this.bgmPlaying) {
            bgm.play().catch(err => console.log('BGM resume failed:', err));
            this.bgmPlaying = true;
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        
        if (this.muted) {
            this.pauseBGM();
        } else {
            this.resumeBGM();
        }
        
        return this.muted;
    }

    setVolume(type, volume) {
        const vol = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
        
        if (type === 'bgm') {
            this.bgmVolume = vol;
            if (this.sounds.bgm) {
                this.sounds.bgm.volume = vol;
            }
        } else if (type === 'sfx') {
            this.sfxVolume = vol;
            for (const [key, sound] of Object.entries(this.sounds)) {
                if (key !== 'bgm') {
                    sound.volume = vol;
                }
            }
        }
    }

    fadeOut(soundName, duration = 2000) {
        const sound = this.sounds[soundName];
        if (!sound) return;

        const startVolume = sound.volume;
        const fadeStep = startVolume / (duration / 50); // Fade in 50ms steps
        
        const fadeInterval = setInterval(() => {
            if (sound.volume > fadeStep) {
                sound.volume -= fadeStep;
            } else {
                sound.volume = 0;
                sound.pause();
                sound.currentTime = 0;
                sound.volume = this.sfxVolume; // Reset volume for next play
                clearInterval(fadeInterval);
            }
        }, 50);
    }
}

export default SoundManager;
