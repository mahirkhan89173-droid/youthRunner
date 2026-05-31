// Game State Manager
const GameState = {
    RUNNING: 'running',
    GAME_OVER: 'game_over'
};

class SubwayRunner {
    constructor() {
        this.speed = 0.5;
        this.lane = 1; // 0: Left, 1: Middle, 2: Right
        this.obstacles = [];
        this.status = GameState.RUNNING;
        
        this.init();
    }

    init() {
        // Lane logic: Player ki position (X-axis)
        this.lanePositions = [-3, 0, 3];
        this.playerX = this.lanePositions[this.lane];
        
        // Input Listener
        window.addEventListener('keydown', (e) => this.handleInput(e));
        this.gameLoop();
    }

    handleInput(e) {
        if (this.status !== GameState.RUNNING) return;

        if (e.key === 'ArrowLeft' && this.lane > 0) this.lane--;
        if (e.key === 'ArrowRight' && this.lane < 2) this.lane++;
        
        // Target position update
        this.playerX = this.lanePositions[this.lane];
    }

    spawnObstacle() {
        // Procedural logic: Random lane par obstacle bhejo
        const obstacle = {
            lane: Math.floor(Math.random() * 3),
            z: -50, // Screen ke bahar se start
            active: true
        };
        this.obstacles.push(obstacle);
    }

    checkCollision(obs) {
        // Collision Detection Math
        if (obs.lane === this.lane && obs.z > -2 && obs.z < 2) {
            this.status = GameState.GAME_OVER;
            console.log("Game Over! Score: " + this.score);
        }
    }

    gameLoop() {
        if (this.status === GameState.RUNNING) {
            // Speed increase logic
            this.speed += 0.0001; 

            // Update obstacles
            this.obstacles.forEach(obs => {
                obs.z += this.speed;
                this.checkCollision(obs);
            });

            // Clean up old obstacles
            this.obstacles = this.obstacles.filter(o => o.z < 10);

            // Random Spawning
            if (Math.random() < 0.02) this.spawnObstacle();
        }
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game
const game = new SubwayRunner();

