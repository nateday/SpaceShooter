module.exports = (function() {
    
    var GameDB = require('./gamedb');
    var Player = require('./player');
    var Asteroids = require('./asteroids');
    
    var state = function() {
        
        var starField = null;
        var engineSfx = null;
        var hudText = null;
        var asteroids = null;
    };
    
    state.prototype = {
        
        init: function() {
            
            this.db = new GameDB();
            
            this.db.getPlayerData(
                function(data) { console.log('player: ', data); },
                function(err) { console.log('error: ', err); }
            );
            
        },
        
        preload: function() {
            
            this.load.image('galaxy', 'assets/images/galaxy.png');
            this.load.image('ship', 'assets/images/ship1.png');
            this.load.image('bullet', 'assets/images/bullet.png');
            this.load.image('asteroid-32x32', 'assets/images/Asteroid-32x32.png');
            this.load.audio('engine', 'assets/sounds/rocket-engine.mp3');
            this.load.audio('ion', 'assets/sounds/ion-cannon.mp3');
            this.load.spritesheet('exhaust', 'assets/images/exhaust.png', 21, 21);
        },
        
        create: function() {
            
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.physics.arcade.gravity.y = 0;
            
            this.starField = this.add.tileSprite(0, 0, 800, 700, 'galaxy');
            
            this.player = new Player(this);
            this.hudText = this.game.add.text(10, 670, '', { font: '15px Arial', fill: '#ffffff' });
            
            this.asteroids = new Asteroids(this);

        },
        
        update: function() {
            
            this.physics.arcade.collide(this.asteroids.sprites);
            
            this.starField.tilePosition.y += 0.500;
            this.hudText.text = this.player.getHudText();
        }
    };
    
    return state;
    
})();