module.exports = (function() {
    
    var GameDB = require('./gamedb');
    var Player = require('./player');
    
    var state = function() {
        
        var starField = null;
        var engineSfx = null;
        var hudText = null;
    };
    
    state.prototype = {
        
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
            
            this.db = new GameDB();
            
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.physics.arcade.gravity.y = 10;
            
            this.starField = this.add.tileSprite(0, 0, 800, 700, 'galaxy');
            
            this.player = new Player(this);
            this.hudText = this.game.add.text(10, 670, '', { font: '15px Arial', fill: '#ffffff' });
            
            var asteroid = this.add.sprite(100, 0, 'asteroid-32x32');
            
            this.physics.enable( asteroid, Phaser.Physics.ARCADE);
            
            asteroid.body.collideWorldBounds = false;
        },
        
        update: function() {
            
            this.starField.tilePosition.y += 0.500;
            this.hudText.text = this.player.getHudText();
        }
    };
    
    return state;
    
})();