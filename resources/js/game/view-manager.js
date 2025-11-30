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
                elements: ['planeDescendingView', 'snow-container'],
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

    // Reusable functions for welcome-actions visibility
    showWelcomeActions() {
        const welcomeWrapper = document.getElementById('welcome-page-wrapper');
        const welcomeActions = welcomeWrapper?.querySelector('.welcome-actions');
        if (welcomeActions) {
            welcomeActions.classList.remove('active');
            welcomeActions.style.display = 'flex';
        }
    }

    hideWelcomeActions() {
        const welcomeWrapper = document.getElementById('welcome-page-wrapper');
        const welcomeActions = welcomeWrapper?.querySelector('.welcome-actions');
        if (welcomeActions) {
            welcomeActions.classList.remove('active');
            welcomeActions.style.setProperty('display', 'none', 'important');
        }
    }

    // Runway Landing Animation Screen
    showRunwayLandingAnimation(withLogo = true, withButton = true, withPlaneAnimation = true, planeInPosition = false, showLeaderboard = false, showLeaderboardNextBtn = false, showCloseButton = true) {
        this.hideAllExcept(['welcome-page-wrapper', 'snow-container', ]);
        this.addActiveClass(['welcome-page-wrapper', 'snow-container']);
        
        // Explicitly hide planeSkyAnimation to prevent overlap (use inline style to override)
        const planeSkyAnimation = document.getElementById('planeSkyAnimation');
        if (planeSkyAnimation) {
            planeSkyAnimation.style.display = 'none';
        }
        this.removeActiveClass(['planeSkyAnimation']);
        
        // Control logo visibility
        const welcomeWrapper = document.getElementById('welcome-page-wrapper');
        const welcomeLogo = welcomeWrapper?.querySelector('.welcome-logo-container');
        const welcomePlane = welcomeWrapper?.querySelector('.airplane-container');
        const leaderboardContainer = welcomeWrapper?.querySelector('.leaderboard-container');
        const leaderboardActions = document.querySelector('.leaderboard-actions');
        
        if (welcomeLogo) {
            if (withLogo) {
                welcomeLogo.classList.add('active');
            } else {
                welcomeLogo.classList.remove('active');
            }
        }
        if (withButton) {
            this.showWelcomeActions();
        } else {
            this.hideWelcomeActions();
        }
        
        // Control leaderboard visibility
        if (leaderboardContainer) {
            if (showLeaderboard) {
                leaderboardContainer.classList.add('active');
                // Fetch leaderboard data when showing
                if (window.leaderboardManager) {
                    window.leaderboardManager.fetchLeaderboard(1);
                }
                
                // Control close button visibility
                const closeBtn = document.getElementById('close-leaderboard-btn');
                if (closeBtn) {
                    if (showCloseButton) {
                        closeBtn.style.display = 'block';
                    } else {
                        closeBtn.style.display = 'none';
                    }
                }
            } else {
                leaderboardContainer.classList.remove('active');
            }
        }
        
        // Control leaderboard actions (Next button) visibility - only show when specified
        if (leaderboardActions) {
            if (showLeaderboardNextBtn) {
                leaderboardActions.classList.add('active');
            } else {
                leaderboardActions.classList.remove('active');
            }
        }
        
        // Handle plane visibility and animation
        if (welcomePlane) {
            if (planeInPosition) {
                // Show plane in final position without animation
                welcomePlane.classList.add('active', 'in-position');
            } else {
                // Remove in-position class if it exists
                welcomePlane.classList.remove('in-position');
                
                // Trigger plane animation if requested
                if (withPlaneAnimation) {
                    // Small delay to ensure view is rendered before animation
                    setTimeout(() => {
                        this.triggerPlaneAnimation();
                    }, 100);
                }
            }
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
        // Hide welcome page wrapper but keep snow visible
        this.removeActiveClass(['welcome-page-wrapper']);

        // Show game elements (conditionally show camera based on settings)
        const elementsToShow = ['game-container', 'game-ui'];
        if (window.gameSettings?.showCamera) {
            elementsToShow.push('camera-container');
        }
        this.addActiveClass(elementsToShow);

        document.body.style.overflow = 'hidden';
    }

    hideGame() {
        this.removeActiveClass(['game-container', 'game-ui', 'camera-container']);
    }

    // Plane Descending View (Airplane flying down animation)
    showPlaneDescending() {
        this.hideAllExcept(['planeDescendingView', 'snow-container']);
        this.addActiveClass(['planeDescendingView', 'snow-container']);
        
        // Reset and trigger plane animation
        const planeContainer = document.querySelector('.plane-descending-container');
        if (planeContainer) {
            // Force animation restart
            planeContainer.style.animation = 'none';
            void planeContainer.offsetWidth; // Force reflow
            planeContainer.style.animation = '';
        }
    }

    hidePlaneDescending() {
        this.removeActiveClass(['planeDescendingView']);
    }

    // Game Over Screen (Landing simulation phase)
    showGameOver(finalScore = 0) {
        console.log('showGameOver called with score:', finalScore, 'gameOverAnimating:', this.gameOverAnimating);
        
        // Prevent multiple simultaneous game over animations
        if (this.gameOverAnimating) {
            console.log('Game over animation already in progress, skipping...');
            return;
        }
        
        this.gameOverAnimating = true;
        
        // Clear any existing timeouts
        this.gameOverTimeouts.forEach(timeout => clearTimeout(timeout));
        this.gameOverTimeouts = [];
        
        // Show plane descending animation first
        console.log('Step 1: Showing plane descending');
        this.showPlaneDescending();
        
        // Hide welcome-actions using reusable function
        this.hideWelcomeActions();
        
        // After 3.5 seconds, show runway landing animation
        const timeout1 = setTimeout(() => {
            this.hidePlaneDescending();
            // Hide all: logo, buttons, plane animation, leaderboard, leaderboard next button
            this.showRunwayLandingAnimation(false, false, false, false, false, false);
            // Ensure welcome-actions stays hidden
            this.hideWelcomeActions();
            const timeout2 = setTimeout(() => {
                console.log('Step 3: Showing congratulations');
                // Hide welcome-actions before showing congratulations
                this.hideWelcomeActions();
                this.showCongratulations(finalScore);
                this.gameOverAnimating = false; 
            }, 7000);
            this.gameOverTimeouts.push(timeout2);
        }, 3500);

        this.gameOverTimeouts.push(timeout1);
        
        this.currentView = 'gameOver';
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
        // Play winning and landing sounds
        if (window.soundManager) {
            window.soundManager.play('landing');
            // Delay winning sound slightly so landing plays first
            setTimeout(() => {
                window.soundManager.play('winning');
            }, 500);
        }
        
        // Hide welcome page wrapper and actions
        const welcomeWrapper = document.getElementById('welcome-page-wrapper');
        if (welcomeWrapper) {
            welcomeWrapper.classList.remove('active');
        }
        
        // Hide welcome actions using reusable function
        this.hideWelcomeActions();
        
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
            
            // Use real ranking from API if available, otherwise calculate mock ranking
            let ranking;
            if (window.playerData && window.playerData.ranking) {
                ranking = '#' + String(window.playerData.ranking).padStart(2, '0');
            } else {
                ranking = this.calculateRanking(finalScore);
            }
            
            const rankingDisplay = document.getElementById('final-ranking');
            if (rankingDisplay) {
                rankingDisplay.textContent = ranking;
            }
            
            // Score already saved in game-scene.js endGame()
            // QR code should be ready in window.playerData.qr_code_url
        }
    }

    calculateRanking(score) {
        // Mock ranking calculation based on score (fallback only)
        // Real ranking comes from API
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
    
    // Optimized show/hide function that properly hides elements
    showElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('active');
            element.style.visibility = 'visible';
            element.style.pointerEvents = 'auto';
        }
    }
    
    hideElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('active');
            element.style.visibility = 'hidden';
            element.style.pointerEvents = 'none';
        }
    }
    
    // Hide all views completely
    hideAllViews() {
        const allViewElements = [
            'welcome-page-wrapper',
            'planeSkyAnimation',
            'planeDescendingView',
            'game-loading',
            'game-container',
            'game-ui',
            'camera-container',
            'game-over-screen',
            'snow-container',
            'game-over-snow-container'
        ];
        
        allViewElements.forEach(elementId => {
            this.hideElement(elementId);
        });
    }
    
    // Hide game over and congratulations screens
    hideGameOverScreens() {
        const congratsScreen = document.getElementById('congratulations-screen');
        const gameOverScreen = document.getElementById('game-over-screen');
        
        if (congratsScreen) {
            congratsScreen.classList.remove('active');
        }
        if (gameOverScreen) {
            gameOverScreen.classList.remove('active');
        }
    }
    
    // Show game over and congratulations screens
    showGameOverScreens() {
        const gameOverScreen = document.getElementById('game-over-screen');
        
        if (gameOverScreen) {
            gameOverScreen.classList.add('active');
        }
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
    
    // Passport Animation Helper Methods
    showPassportAnimation(onComplete) {
        const passportAnimation = document.getElementById('passport-animation');
        const passportActions = document.querySelector('.passport-actions');
        const passportQrCode = document.getElementById('passport-qr-code');
        
        if (passportAnimation) {
            passportAnimation.classList.add('active');
            
            // Display QR code if available
            if (window.playerData && window.playerData.qr_code_url && passportQrCode) {
                console.log('Setting QR code image:', window.playerData.qr_code_url);
                passportQrCode.src = window.playerData.qr_code_url;
                passportQrCode.style.display = 'block';
            } else {
                console.warn('QR code not available:', { 
                    playerData: window.playerData, 
                    qrCodeUrl: window.playerData?.qr_code_url,
                    element: passportQrCode 
                });
            }
            
            // Show Done button after animation completes
            if (passportActions) {
                setTimeout(() => {
                    passportActions.classList.add('active');
                }, 1500); // Show after animation finishes
            }
            
            // Call onComplete callback after animation finishes (1.5s)
            if (onComplete && typeof onComplete === 'function') {
                setTimeout(() => {
                    onComplete();
                }, 1500); // Match animation duration
            }
        }
    }
    
    hidePassportAnimation() {
        const passportAnimation = document.getElementById('passport-animation');
        const passportActions = document.querySelector('.passport-actions');
        
        if (passportAnimation) {
            passportAnimation.classList.remove('active');
        }
        if (passportActions) {
            passportActions.classList.remove('active');
        }
    }
}
