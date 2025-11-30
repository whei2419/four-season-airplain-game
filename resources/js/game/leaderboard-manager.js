// Leaderboard Manager - Handles leaderboard data fetching and display
export default class LeaderboardManager {
    constructor() {
        this.currentPage = 1;
        this.perPage = 5;
        this.totalPages = 1;
    }

    async fetchLeaderboard(page = 1) {
        try {
            const baseUrl = window.apiUrls?.leaderboard || '/api/game/leaderboard';
            const response = await fetch(`${baseUrl}?page=${page}&per_page=${this.perPage}`);
            const result = await response.json();

            if (result.success) {
                this.currentPage = result.pagination.current_page;
                this.totalPages = result.pagination.last_page;
                this.renderLeaderboard(result.data);
                this.updatePaginationControls();
            } else {
                console.error('Failed to fetch leaderboard');
                this.showError();
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            this.showError();
        }
    }

    renderLeaderboard(scores) {
        const leaderboardBody = document.getElementById('leaderboard-body');
        
        if (!leaderboardBody) return;

        if (scores.length === 0) {
            leaderboardBody.innerHTML = `
                <div style="text-align: center; padding: 50px; color: #999; font-family: 'Gordita', sans-serif;">
                    No scores yet. Be the first to play!
                </div>
            `;
            return;
        }

        leaderboardBody.innerHTML = scores.map(score => {
            const isTopThree = score.rank <= 3;
            const crownEmoji = score.rank === 1 ? '👑' : score.rank === 2 ? '🥈' : score.rank === 3 ? '🥉' : '';
            const topThreeClass = isTopThree ? `top-${score.rank}` : '';
            
            return `
                <div class="leaderboard-row ${topThreeClass}">
                    <div class="leaderboard-col rank-col">
                        ${isTopThree ? `<span class="crown-icon">${crownEmoji}</span>` : score.rank}
                    </div>
                    <div class="leaderboard-col">${score.flight_number ? score.flight_number.toUpperCase() : 'N/A'}</div>
                    <div class="leaderboard-col">${this.escapeHtml(score.player_name)}</div>
                    <div class="leaderboard-col points-col">${score.score} PTS</div>
                </div>
            `;
        }).join('');
    }

    updatePaginationControls() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const currentPageSpan = document.getElementById('current-page');
        const totalPagesSpan = document.getElementById('total-pages');

        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }

        if (nextBtn) {
            nextBtn.disabled = this.currentPage === this.totalPages || this.totalPages === 0;
        }

        if (currentPageSpan) {
            currentPageSpan.textContent = this.currentPage;
        }

        if (totalPagesSpan) {
            totalPagesSpan.textContent = this.totalPages || 1;
        }
    }

    setupPaginationListeners() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.fetchLeaderboard(this.currentPage - 1);
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.currentPage < this.totalPages) {
                    this.fetchLeaderboard(this.currentPage + 1);
                }
            });
        }
    }

    showError() {
        const leaderboardBody = document.getElementById('leaderboard-body');
        if (leaderboardBody) {
            leaderboardBody.innerHTML = `
                <div style="text-align: center; padding: 50px; color: #e74c3c; font-family: 'Gordita', sans-serif;">
                    Failed to load leaderboard. Please try again.
                </div>
            `;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    async saveScore(playerName, flightNumber, score) {
        try {
            const saveScoreUrl = window.apiUrls?.saveScore || '/api/game/save-score';
            const response = await fetch(saveScoreUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    player_name: playerName,
                    flight_number: flightNumber,
                    score: score,
                }),
            });

            const result = await response.json();

            if (result.success) {
                console.log('Score saved successfully:', result.data);
                return result.data;
            } else {
                console.error('Failed to save score');
                return null;
            }
        } catch (error) {
            console.error('Error saving score:', error);
            return null;
        }
    }
}
