// View Manager - Handles screen transitions and state management
export default class ViewManager {
    constructor() {
        this.currentView = 'runwayLandingAnimation';
        this.activeSnowEffects = {}; // Track active snow instances
        this.gameOverAnimating = false; // Prevent multiple game over animations
        this.gameOverTimeouts = []; // Track timeouts for cleanup
        this.views = {
            runwayLandingAnimation: {
                elements: ['welcome-page-wrapper', 'snow-container'],
                onEnter: () => this.showRunwayLandingAnimation(),
                onExit: () => this.hideRunwayLandingAnimation()
            },
            planeSkyAnimation: {
                elements: ['planeSkyAnimation', 'snow-container'],
                onEnter: () => this.showPlaneSkyAnimation(),
                onExit: () => this.hidePlaneSkyAnimation()
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
            planeDescending: {
                elements: ['game-over-screen', 'game-over-snow-container'],
                onEnter: () => this.showPlaneDescending(),
                onExit: () => this.hidePlaneDescending()
            },
            gameOver: {
                elements: ['game-over-screen', 'game-over-snow-container'],
                onEnter: () => this.showGameOver(),
                onExit: () => this.hideGameOver()
            }
        };
        
        // Initialize default view on construction
        this.showRunwayLandingAnimation();
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

    // Runway Landing Animation Screen
    showRunwayLandingAnimation(withLogo = true, withButton = true, withPlaneAnimation = true) {
        this.hideAllExcept(['welcome-page-wrapper', 'snow-container']);
        this.addActiveClass(['welcome-page-wrapper', 'snow-container']);
        
        // Control logo visibility
        const welcomeWrapper = document.getElementById('welcome-page-wrapper');
        const welcomeLogo = welcomeWrapper?.querySelector('.welcome-logo-container');
        const welcomeActions = welcomeWrapper?.querySelector('.welcome-actions');
        
        if (welcomeLogo) {
            if (withLogo) {
                welcomeLogo.classList.add('active');
            } else {
                welcomeLogo.classList.remove('active');
            }
        }
        if (welcomeActions) {
            if (withButton) {
                welcomeActions.classList.add('active');
            } else {
                welcomeActions.classList.remove('active');
            }
        }
        
        // Trigger plane animation if requested
        if (withPlaneAnimation) {
            // Small delay to ensure view is rendered before animation
            setTimeout(() => {
                this.triggerPlaneAnimation();
            }, 100);
        }
    }

    // Trigger the airplane animation manually
    triggerPlaneAnimation() {
        const welcomeWrapper = document.getElementById('welcome-page-wrapper');
        const welcomePlane = welcomeWrapper?.querySelector('.airplane-container');
        
        if (welcomePlane) {
            // Remove active class first to reset animation
            welcomePlane.classList.remove('active');
            
            // Force browser reflow to completely reset the animation
            void welcomePlane.offsetWidth;
            
            // Small delay to ensure clean restart
            requestAnimationFrame(() => {
                welcomePlane.classList.add('active');
                console.log('Plane animation triggered');
            });
        }
    }

    hideRunwayLandingAnimation() {
        this.removeActiveClass(['welcome-page-wrapper']);
        
        // Hide child elements that use position: fixed
        const welcomeWrapper = document.getElementById('welcome-page-wrapper');
        if (welcomeWrapper) {
            const welcomeLogo = welcomeWrapper.querySelector('.welcome-logo-container');
            const welcomeActions = welcomeWrapper.querySelector('.welcome-actions');
            
            if (welcomeLogo) welcomeLogo.classList.remove('active');
            if (welcomeActions) welcomeActions.classList.remove('active');
        }
    }

    // Plane Sky Animation Screen
    showPlaneSkyAnimation() {
        this.hideAllExcept(['planeSkyAnimation', 'snow-container']);
        this.addActiveClass(['planeSkyAnimation', 'snow-container']);
        
        // Start snow effect with a small delay to ensure container is visible
        setTimeout(() => {
            this.startSnow('snow-container');
        }, 50);
    }

    hidePlaneSkyAnimation() {
        this.removeActiveClass(['planeSkyAnimation']);
    }

    // Loading Screen
    showLoading() {
        this.hideAllExcept(['game-loading', 'snow-container']);
        this.addActiveClass(['game-loading', 'snow-container']);
        
        // Keep snow effect running (already started from planeSkyAnimation)
    }

    hideLoading() {
        const loadingScreen = document.getElementById('game-loading');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.classList.remove('active', 'fade-out');
                }
            }, 500);
        }
    }

    // Game Screen
    showGame() {
        // Stop and clear snow before showing game
        this.stopSnow('snow-container');
        if (window.destroySnowEffect) {
            window.destroySnowEffect();
        }
        
        // Hide welcome and snow containers
        this.removeActiveClass(['welcome-page-wrapper', 'snow-container']);

        // Show game elements
        this.addActiveClass(['game-container', 'game-ui', 'camera-container']);

        document.body.style.overflow = 'hidden';
    }

    hideGame() {
        this.removeActiveClass(['game-container', 'game-ui', 'camera-container']);
    }

    // Plane Descending View (Airplane flying down animation)
    showPlaneDescending() {
        // TO DO: Refactor this view
    }

    hidePlaneDescending() {
        // TO DO: Refactor this view
    }

    // Game Over Screen (Landing simulation phase)
    showGameOver(finalScore = 0) {
        // Prevent multiple simultaneous game over animations
        if (this.gameOverAnimating) {
            console.log('Game over animation already in progress, skipping...');
            return;
        }
        
        this.gameOverAnimating = true;
        
        // Clear any existing timeouts
        this.gameOverTimeouts.forEach(timeout => clearTimeout(timeout));
        this.gameOverTimeouts = [];
        
        // Hide the descending plane
        this.hidePlaneDescending();
        
        // TO DO: Refactor game over view

        // Show congratulations screen after landing simulation (3 seconds)
        // TEMPORARILY DISABLED FOR DEBUGGING
        /*
        this.gameOverTimeouts.push(setTimeout(() => {
            this.showCongratulations(finalScore);
        }, 3000));
        */
    }

    showLandingTerminal() {
        const landingTerminal = document.getElementById('landing-terminal');
        if (landingTerminal) {
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
        // Hide welcome page wrapper
        const welcomeWrapper = document.getElementById('welcome-page-wrapper');
        if (welcomeWrapper) {
            welcomeWrapper.classList.remove('active');
        }
        
        // Show game over screen again
        const gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen) {
            gameOverScreen.classList.add('active');
        }
        
        // Hide the flying plane animation
        const airplaneContainer = document.querySelector('.airplane-container-down');
        if (airplaneContainer) {
            airplaneContainer.classList.remove('active');
        }
        
        // Ensure game container is hidden
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.classList.remove('active');
        }
        
        const congratsScreen = document.getElementById('congratulations-screen');
        if (congratsScreen) {
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
        this.gameOverAnimating = false;
        
        // Clear any pending timeouts
        this.gameOverTimeouts.forEach(timeout => clearTimeout(timeout));
        this.gameOverTimeouts = [];
        
        const gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen) {
            gameOverScreen.classList.remove('active');
        }

        // Clean up all phases
        const welcomeWrapper = document.getElementById('welcome-page-wrapper');
        const congratsScreen = document.getElementById('congratulations-screen');
        const airplaneContainer = document.querySelector('.airplane-container-down');
        
        // Reset welcome wrapper elements visibility
        if (welcomeWrapper) {
            const welcomeLogo = welcomeWrapper.querySelector('.welcome-logo-container');
            const welcomeActions = welcomeWrapper.querySelector('.welcome-actions');
            const welcomePlane = welcomeWrapper.querySelector('.airplane-container');
            
            if (welcomeLogo) welcomeLogo.classList.add('active');
            if (welcomeActions) welcomeActions.classList.add('active');
            if (welcomePlane) welcomePlane.classList.add('active');
        }
        
        if (congratsScreen) {
            congratsScreen.classList.remove('active');
        }
        
        if (airplaneContainer) {
            airplaneContainer.classList.remove('active');
        }

        // Clean up game over snow
        this.stopSnow('game-over-snow-container');
    }

    // Helper methods
    addActiveClass(elementIds) {
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('active');
            }
        });
    }

    removeActiveClass(elementIds) {
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('active');
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
                            element.classList.remove('active');
                        }
                    }
                });
            }
        });
    }

    getCurrentView() {
        return this.currentView;
    }

    // Snow Effect Helper Methods
    startSnow(containerId) {
        // Stop any existing snow effect for this container
        this.stopSnow(containerId);
        
        // Create new snow effect
        if (window.SnowEffect) {
            this.activeSnowEffects[containerId] = new window.SnowEffect(containerId);
            console.log(`Snow effect started for: ${containerId}`);
        } else {
            console.warn('SnowEffect class not available');
        }
    }

    stopSnow(containerId) {
        // Stop and clean up snow effect
        if (this.activeSnowEffects[containerId]) {
            if (this.activeSnowEffects[containerId].destroy) {
                this.activeSnowEffects[containerId].destroy();
            }
            delete this.activeSnowEffects[containerId];
            console.log(`Snow effect stopped for: ${containerId}`);
        }
        
        // Also clean up the container
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
        }
    }

    showSnow(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.classList.add('active');
        }
    }

    hideSnow(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.classList.remove('active');
        }
    }

    stopAllSnow() {
        // Stop all active snow effects
        Object.keys(this.activeSnowEffects).forEach(containerId => {
            this.stopSnow(containerId);
        });
    }
}
