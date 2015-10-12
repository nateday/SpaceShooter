module.exports = (function() {
    
    var sprites = null;
    var game = null;
    
    var Asteroids = function(game) {
        
        this.game = game;
        this.sprites = game.add.group();
        
        this.sprites.enableBody = true;
        this.sprites.physicsBodyType = Phaser.Physics.ARCADE;
        this.sprites.createMultiple(25, 'asteroid-32x32');
        this.sprites.setAll('anchor.x', 0.5);
        this.sprites.setAll('anchor.y', 0.5);
        //this.sprites.setAll('outOfBoundsKill', true);
        this.sprites.setAll('checkWorldBounds', true);
        
        this.sprites.forEach(function(asteroid) {
            
            var sx = this.game.rnd.integerInRange(16, 780);
            var vx = this.game.rnd.integerInRange(-25, 25);
            var vy = this.game.rnd.integerInRange(10, 25);
            var spinRate = this.game.rnd.integerInRange(3000, 7000);

            asteroid.reset(sx, 16);
            
            //asteroid.scale.set(game.rnd.realInRange(0.5, 1.5));
            asteroid.body.velocity.setTo(vx, vy);
            asteroid.body.bounce.setTo(0.8, 0.5);
            
            if(Phaser.Utils.chanceRoll(50)) {
                this.game.add.tween(asteroid).to( { angle: 360 }, spinRate, Phaser.Easing.Linear.None, true, 0, -1);
            }
            else {
                this.game.add.tween(asteroid).from( { angle: 360 }, spinRate, Phaser.Easing.Linear.None, true, 0, -1);
            }
            
            asteroid.events.onOutOfBounds.add(outOfBounds, this);
            
        }, this);
    }
    
    return Asteroids;

    function outOfBounds(asteroid) {

        if (asteroid.x < 0) {
            asteroid.x = asteroid.game.width;
        }
        else if (asteroid.x > asteroid.game.width) {
            asteroid.x = 0;
        }

        if (asteroid.y > asteroid.game.height) {
            asteroid.kill();
        }

    }

})();