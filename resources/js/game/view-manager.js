// View Manager - Handles screen transitions and state management
export default class ViewManager {
    constructor() {
        this.currentView = 'welcome';
        this.views = {
            welcome: {
                elements: ['welcome-page-wrapper', 'snow-container'],
                onEnter: () => this.showWelcome(),
                onExit: () => this.hideWelcome()
            },
            countdown: {
                elements: ['countdown-screen', 'snow-container'],
                onEnter: () => this.showCountdown(),
                onExit: () => this.hideCountdown()
            },
            loading: {
                elements: ['game-loading', 'snow-container'],
                onEnter: () => this.showLoading(),
                onExit: () => this.hideLoading()
            },
            game: {
                elements: ['game-container', 'game-ui', 'camera-container'],
                onEnter: () => this.showGame(),
                onExit: () => this.hideGame()
            },
            gameOver: {
                elements: ['game-over-screen', 'game-over-snow-container'],
                onEnter: () => this.showGameOver(),
                onExit: () => this.hideGameOver()
            }
        };
    }

    switchView(viewName) {
        if (!this.views[viewName]) {
            console.error(`View "${viewName}" does not exist`);
            return;
        }

        console.log(`Switching from ${this.currentView} to ${viewName}`);

        // Exit current view
        if (this.views[this.currentView] && this.views[this.currentView].onExit) {
            this.views[this.currentView].onExit();
        }

        // Update current view
        this.currentView = viewName;

        // Enter new view
        if (this.views[viewName].onEnter) {
            this.views[viewName].onEnter();
        }
    }

    // Welcome Screen
    showWelcome() {
        this.setElementsDisplay(['welcome-page-wrapper', 'snow-container'], 'block');
        this.hideAllExcept(['welcome-page-wrapper', 'snow-container']);
    }

    hideWelcome() {
        this.setElementsDisplay(['welcome-page-wrapper'], 'none');
    }

    // Countdown Screen
    showCountdown() {
        const countdownScreen = document.getElementById('countdown-screen');
        if (countdownScreen) {
            countdownScreen.style.display = 'flex';
        }
        this.hideAllExcept(['countdown-screen', 'snow-container']);
    }

    hideCountdown() {
        const countdownScreen = document.getElementById('countdown-screen');
        if (countdownScreen) {
            countdownScreen.style.display = 'none';
        }
    }

    // Loading Screen
    showLoading() {
        const loadingScreen = document.getElementById('game-loading');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
        this.hideAllExcept(['game-loading', 'snow-container']);
    }

    hideLoading() {
        const loadingScreen = document.getElementById('game-loading');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                if (loadingScreen) loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // Game Screen
    showGame() {
        const gameContainer = document.getElementById('game-container');
        const gameUI = document.getElementById('game-ui');
        const cameraContainer = document.getElementById('camera-container');

        // Hide welcome and snow
        this.setElementsDisplay(['welcome-page-wrapper', 'snow-container'], 'none');

        // Clear snow for performance
        const snowContainer = document.getElementById('snow-container');
        if (snowContainer) {
            snowContainer.innerHTML = '';
        }
        if (window.destroySnowEffect) {
            window.destroySnowEffect();
        }

        // Show game elements
        if (gameContainer) {
            gameContainer.style.display = 'flex';
            gameContainer.style.zIndex = '9999';
        }

        if (gameUI) {
            gameUI.style.display = 'block';
            gameUI.style.zIndex = '10000';
        }

        if (cameraContainer) {
            cameraContainer.style.display = 'block';
            cameraContainer.style.zIndex = '10001';
        }

        document.body.style.overflow = 'hidden';
    }

    hideGame() {
        const gameContainer = document.getElementById('game-container');
        const gameUI = document.getElementById('game-ui');
        const cameraContainer = document.getElementById('camera-container');

        this.setElementsDisplay(['game-container', 'game-ui', 'camera-container'], 'none');
    }

    // Game Over Screen
    showGameOver(finalScore = 0) {
        const gameOverScreen = document.getElementById('game-over-screen');
        
        // Hide game elements
        this.hideGame();

        // Show game over screen
        if (gameOverScreen) {
            gameOverScreen.style.display = 'flex';
            gameOverScreen.style.zIndex = '20000';
        }

        // Initialize snow effect for game over
        const gameOverSnowContainer = document.getElementById('game-over-snow-container');
        if (gameOverSnowContainer && window.SnowEffect) {
            this.gameOverSnow = new window.SnowEffect('game-over-snow-container');
        }

        // Phase 1: Trigger plane flying animation (5 seconds)
        setTimeout(() => {
            const airplaneContainer = gameOverScreen?.querySelector('.airplane-container-down');
            if (airplaneContainer) {
                airplaneContainer.classList.add('active');
            }
        }, 100);

        // Phase 2: Show congratulations screen after plane flies across (5.5 seconds)
        setTimeout(() => {
            this.showCongratulations(finalScore);
        }, 5500);
    }

    showLandingTerminal() {
        const landingTerminal = document.getElementById('landing-terminal');
        if (landingTerminal) {
            landingTerminal.style.display = 'block';
            landingTerminal.classList.add('active');
            
            // Trigger plane descending animation
            setTimeout(() => {
                const landingPlane = landingTerminal.querySelector('.landing-plane');
                if (landingPlane) {
                    landingPlane.classList.add('descending');
                }
            }, 500);
        }
    }

    showCongratulations(finalScore) {
        // Hide landing terminal first
        const landingTerminal = document.getElementById('landing-terminal');
        if (landingTerminal) {
            landingTerminal.style.display = 'none';
        }
        
        // Hide the flying plane animation
        const airplaneContainer = document.querySelector('.airplane-container-down');
        if (airplaneContainer) {
            airplaneContainer.style.display = 'none';
        }
        
        // Ensure game container is hidden
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.style.display = 'none';
        }
        
        const congratsScreen = document.getElementById('congratulations-screen');
        if (congratsScreen) {
            congratsScreen.style.display = 'flex';
            congratsScreen.classList.add('active');
            
            // Update score display
            const scoreDisplay = document.getElementById('final-score-display');
            if (scoreDisplay) {
                scoreDisplay.textContent = finalScore;
            }
            
            // Calculate ranking (simple mock - you can implement real ranking logic)
            const ranking = this.calculateRanking(finalScore);
            const rankingDisplay = document.getElementById('final-ranking');
            if (rankingDisplay) {
                rankingDisplay.textContent = ranking;
            }
        }
    }

    calculateRanking(score) {
        // Mock ranking calculation based on score
        // You can replace this with actual API call to get real ranking
        if (score >= 100) return '#01';
        if (score >= 75) return '#02';
        if (score >= 50) return '#03';
        if (score >= 30) return '#05';
        if (score >= 15) return '#10';
        return '#20';
    }

    hideGameOver() {
        const gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen) {
            gameOverScreen.style.display = 'none';
        }

        // Clean up all phases
        const landingTerminal = document.getElementById('landing-terminal');
        const congratsScreen = document.getElementById('congratulations-screen');
        const airplaneContainer = document.querySelector('.airplane-container-down');
        
        if (landingTerminal) {
            landingTerminal.style.display = 'none';
            landingTerminal.classList.remove('active');
            const landingPlane = landingTerminal.querySelector('.landing-plane');
            if (landingPlane) landingPlane.classList.remove('descending');
        }
        
        if (congratsScreen) {
            congratsScreen.style.display = 'none';
            congratsScreen.classList.remove('active');
        }
        
        if (airplaneContainer) {
            airplaneContainer.classList.remove('active');
        }

        // Clean up game over snow
        const gameOverSnowContainer = document.getElementById('game-over-snow-container');
        if (gameOverSnowContainer) {
            gameOverSnowContainer.innerHTML = '';
        }
    }

    // Helper methods
    setElementsDisplay(elementIds, displayValue) {
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = displayValue;
            }
        });
    }

    hideAllExcept(keepVisible) {
        Object.keys(this.views).forEach(viewName => {
            if (viewName !== this.currentView) {
                this.views[viewName].elements.forEach(elementId => {
                    if (!keepVisible.includes(elementId)) {
                        const element = document.getElementById(elementId);
                        if (element) {
                            element.style.display = 'none';
                        }
                    }
                });
            }
        });
    }

    getCurrentView() {
        return this.currentView;
    }
}
