module.exports = (function() {
    
    var sprites = null;
    var asteroids = null;
    var explosions = null;
    var sfx = null;
    var game = null;
    
    var Asteroids = function(game) {
        
        this.game = game;
        this.asteroids = game.add.emitter(game.world.centerX, -20, 100);
        
        this.asteroids.width = 800;
        this.asteroids.makeParticles('asteroid-32x32');
        this.asteroids.bounce.setTo(0.5, 0.5);
        this.asteroids.setXSpeed(-25, 25);
        this.asteroids.setYSpeed(10, 40);
        this.asteroids.setRotation(-90, 90);
        this.asteroids.minParticleScale = 0.5;
        this.asteroids.maxParticleScale = 1.5;
        this.asteroids.gravity = 0;
        this.asteroids.setAll('outOfBoundsKill', false);
        this.asteroids.setAll('checkWorldBounds', true);
        
        this.asteroids.forEach(function(asteroid) {
            asteroid.events.onOutOfBounds.add(outOfBounds, this);
        }, this);
        
        this.asteroids.flow(0, 1500, 10, 100);
                
        this.explosions = this.game.add.group();
        this.explosions.createMultiple(30, 'explosion');
        this.explosions.forEach(setupExplosion, this);
        
        this.sfx = game.add.audio('explosion');
        this.sfx.allowMultiple = true;
    }
    
    Asteroids.prototype.explode = function(asteroid) {
        
        asteroid.kill();
        
        var explosion = this.explosions.getFirstExists(false);
        
        explosion.reset(asteroid.body.x, asteroid.body.y);
        explosion.scale = asteroid.scale;
        explosion.rotation = asteroid.rotation;
        explosion.play('explosion', 60, false, true);
        
        this.sfx.play();
    };
    
    return Asteroids;

    function outOfBounds(asteroid) {

        if (asteroid.y < 0) {
            return;
        }

        if (asteroid.y > asteroid.game.height) {
            asteroid.kill();
        }

        if (asteroid.body.right < 0) {
            //console.log('Out Left: ', asteroid);
            asteroid.x = asteroid.game.width;
        }
        else if (asteroid.x > asteroid.game.width) {
            //console.log('Out Right: ', asteroid);
            asteroid.x = 0 - asteroid.body.width + 2;
        }

    }
    
    function setupExplosion(explosion) {

        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('explosion');
    }

})();