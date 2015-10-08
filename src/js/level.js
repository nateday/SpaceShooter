module.exports = (function() {
    
    var Weapon = require('./weapon');
    
    var state = function() {
        
        var starField = null;
        var engineSfx = null;
    };
    
    state.prototype = {
        
        preload: function() {
            
            this.load.image('galaxy', 'assets/galaxy.png');
            this.load.image('ship', 'assets/ship1.png');
            this.load.image('bullet', 'assets/bullet.png');
            this.load.audio('engine', 'assets/rocket-engine.mp3');
            this.load.audio('ion', 'assets/ion-cannon.mp3');
        },
        
        create: function() {
            
            this.starField = this.add.tileSprite(0, 0, 800, 700, 'galaxy');
            
            this.player = this.add.sprite(375, 600, 'ship');
            this.player.collideWorldBounds=true;
            this.player.weapon = new Weapon(this);
            
            this.physics.enable(this.player, Phaser.Physics.ARCADE);
            
            this.engineSfx = this.add.audio('engine', 1, true);
            this.engineSfx.allowMultiple = false;
            this.engineSfx.play();
        },
        
        update: function() {
            
            this.starField.tilePosition.y += 0.500;
            
            if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.player.x >=2) {
                this.player.x -= 2;
            }
            else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.player.x < (800 - this.player.width - 2)) {
                this.player.x += 2;
            }
            
            if (this.input.keyboard.isDown(Phaser.Keyboard.S)) {
                this.player.weapon.fire(this.player);
            }
        }
    };
    
    return state;
    
})();