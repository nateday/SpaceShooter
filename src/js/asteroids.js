module.exports = (function() {
    
    var sprites = null;
    var game = null;
    
    var Asteroids = function(game) {
        
        this.game = game;
        this.sprites = game.add.group();
        
        this.sprites.enableBody = true;
        this.sprites.physicsBodyType = Phaser.Physics.ARCADE;
        this.sprites.createMultiple(10, 'asteroid-32x32');
        this.sprites.setAll('anchor.x', 0.5);
        this.sprites.setAll('anchor.y', 1);
        this.sprites.setAll('outOfBoundsKill', true);
        this.sprites.setAll('checkWorldBounds', true);
        
        this.sprites.forEach(function(asteroid) {
            
            var sx = this.game.rnd.integerInRange(16, 780);
            var vx = this.game.rnd.integerInRange(-5, 5);
            var vy = this.game.rnd.integerInRange(5, 25);

            asteroid.reset(sx, 16);
            
            asteroid.body.velocity.setTo(vx, vy);
            asteroid.body.bounce.setTo(0.5, 0.5);
            
        }, this);
    }
    
    return Asteroids;
    
})();