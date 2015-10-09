module.exports = (function() {
    
    var Weapon = require('./weapon');
    
    var game = null;
    var ship = null;
    
    var Player = function(game) {
        
        var self = this;
        
        Phaser.Group.call(self, game, game.world, 'Player', false, true, Phaser.Physics.ARCADE);

        self.game = game;
        
        // Create ship sprite snd add to group
        self.ship = game.add.sprite(game.world.centerX - 25, game.world.bounds.bottom - 90, 'ship');
        
        self.ship.collideWorldBounds=true;
        self.ship.weapon = new Weapon(game);
        game.physics.enable(self.ship, Phaser.Physics.ARCADE);
        self.add(self.ship);
        
        // Create exhaust animation and add to group
        var exhaust = game.add.sprite(game.world.centerX - 12, self.ship.y + self.ship.height - 2, 'exhaust');
        var flicker = exhaust.animations.add('flicker');
            
        exhaust.animations.play('flicker', 30, true);
        self.add(exhaust);
        
        // Create exhaust sound
        self.engineSfx = game.add.audio('engine', 1, true);
        self.engineSfx.allowMultiple = false;
        self.engineSfx.play();

        self.game.time.events.loop(15, function() { 
            
            if(self.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                moveLeft(self);
            }
            
            if(self.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                moveRight(self);
            }
            
            if(self.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                self.ship.weapon.fire(self.ship);
            }
            
       }, self);
    };
    
    Player.prototype = Object.create(Phaser.Group.prototype);
    Player.prototype.constructor = Player;
    
    Player.prototype.getHudText = function() {
        return this.ship.weapon.getHudText();
    };
    
    function moveLeft(player) {
        
        if(player.ship.left >= 2) {
            player.addAll('x', -2);
        }
    };
    
    function moveRight(player) {
        
        if (player.ship.right < player.game.world.width - 2) {
            player.addAll('x', 2);
        }
    };
    
    return Player;

})();