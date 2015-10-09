module.exports = (function() {
    
    var Weapon = require('./weapon');
    
    var game = null;
    var ship = null;
    var sprites = null;
    
    var Ship = function(game) {
        
        var self = this;
        
        self.game = game;
        self.sprites = game.add.group();
        
        // Create ship sprite snd add to the sprites group
        self.ship = game.add.sprite(game.world.centerX - 25, game.world.bounds.bottom - 90, 'ship');
        
        self.ship.collideWorldBounds=true;
        self.ship.weapon = new Weapon(game);
        game.physics.enable(self.ship, Phaser.Physics.ARCADE);
        self.sprites.add(self.ship);
        
        // Create exhaust animation and add to group
        var exhaust = game.add.sprite(game.world.centerX - 12, self.ship.y + self.ship.height - 2, 'exhaust');
        var flicker = exhaust.animations.add('flicker');
            
        exhaust.animations.play('flicker', 30, true);
        self.sprites.add(exhaust);
        
        // Create exhaust sound
        self.engineSfx = game.add.audio('engine', 1, true);
        self.engineSfx.allowMultiple = false;
        self.engineSfx.play();

        self.game.time.events.loop(15, function() { 
            
            if(self.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                moveLeft();
            }
            
            if(self.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                moveRight();
            }
            
            if(self.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                self.ship.weapon.fire(self.ship);
            }
            
       }, self);
    
        function moveLeft() {

            if(self.ship.left >= 2) {
                self.sprites.addAll('x', -2);
            }
        };

        function moveRight() {

            if (self.ship.right < self.game.world.width - 2) {
                self.sprites.addAll('x', 2);
            }
        };
    };
    
    Ship.prototype.getHudText = function() {
        return this.ship.weapon.getHudText();
    };
    
    return Ship;

})();