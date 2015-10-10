module.exports = (function() {
    
    var sprites = null;
    var game = null;
    
    var Asteroids = function(game) {
        
        this.game = game;
        this.sprites = game.add.group();
        
        for (var i = 0; i < 5; i++) {
            
            var asteroid = this.game.add.sprite(100, 0, 'asteroid-32x32');
            game.physics.enable(asteroid, Phaser.Physics.ARCADE);
            asteroid.body.velocity.setTo(5 + i * 5, 7 + i * 20);
            asteroid.body.bounce.setTo(0.5, 0.5);
            this.sprites.add(asteroid, true);
        }
    }
    
    return Asteroids;
    
})();