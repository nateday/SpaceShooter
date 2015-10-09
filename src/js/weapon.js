module.exports = (function() {
    
    var Bullet = require('./bullet');
    
    var sprites = null;
    var game = null;
    
    var Weapon = function(game) {
        
        this.game = game;
        this.sprites = game.add.group();
        
        this.nextFire = 0;
        this.bulletSpeed = 300;
        this.fireRate = 100;
        this.barrelTemp = 0;
        this.ammoCount = 500;
        
        this.sfx = game.add.audio('ion');
        this.sfx.allowMultiple = true;

        for (var i = 0; i < 64; i++)
        {
            var bullet = new Bullet(game, 'bullet');
            game.physics.enable(bullet, Phaser.Physics.ARCADE);
            this.sprites.add(bullet, true);
        }

        this.game.time.events.loop(500, function() { 
            
            if(this.barrelTemp > 100) {
                this.barrelTemp *= .98;
            }
            else if(this.barrelTemp > 75) {
                this.barrelTemp *= .9;
            }
            else if(this.barrelTemp > 50) {
                this.barrelTemp *= .75;
            }
            else if(this.barrelTemp > 30) {
                this.barrelTemp *= .6;
            }
            else if(this.barrelTemp > 5) {
                this.barrelTemp *= .45;
            }
            else {
                this.barrelTemp = 0;
            }
            
        }, this);
        
        return this;
    };
    
    Weapon.prototype.fire = function(source) {
        
        if (this.ammoCount === 0) {
            return;
        }
        
        this.fireRate = 100 + (this.barrelTemp >= 100 ? this.barrelTemp / 25 * 30 : 0);

        if (this.game.time.time < this.nextFire) {
            return; 
        }
        
        var x = source.x + 25;
        var y = source.y - 5;

        this.sprites.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);
        this.sfx.play();
        this.barrelTemp += 5;
        this.ammoCount -= 1;

        this.nextFire = this.game.time.time + this.fireRate;
    };
    
    Weapon.prototype.getHudText = function() {
        
        return '[ Ammo: ' + this.ammoCount + ' ]  [ Temp: ' + this.barrelTemp.toPrecision(4) + ' ]';
    };
    
    return Weapon;
    
})();