module.exports = (function() {
    
    var Bullet = require('./bullet');
    
    var Weapon = function(game) {
        
        Phaser.Group.call(this, game, game.world, 'SingleFire', false, true, Phaser.Physics.ARCADE);
        
        this.nextFire = 0;
        this.bulletSpeed = 300;
        this.fireRate = 100;
        this.barrelTemp = 0;
        
        this.sfx = game.add.audio('ion');
        this.sfx.allowMultiple = true;

        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, 'bullet'), true);
        }

        this.game.time.events.loop(500, function() { 
            
            if(this.barrelTemp > 5) {
                this.barrelTemp *= .9;
            }
            else {
                this.barrelTemp = 0;
            }
            
            this.hudText.text = "Barrel: " + this.barrelTemp.toPrecision(4);
             
        }, this);
        
        this.hudText = this.game.add.text(10, 670, "Barrel: " + this.barrelTemp.toPrecision(4), { font: "15px Arial", fill: "#ffffff" });
        
        return this;
    };
    
    Weapon.prototype = Object.create(Phaser.Group.prototype);
    Weapon.prototype.constructor = Weapon;
    
    Weapon.prototype.fire = function(source) {
        
        if (this.barrelTemp >= 100) {
            return;
        }

        if (this.game.time.time < this.nextFire) {
            return; 
        }
        
        var x = source.x + 25;
        var y = source.y - 5;

        this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);
        this.sfx.play();
        this.barrelTemp += 5;

        this.nextFire = this.game.time.time + this.fireRate;
    };
    
    return Weapon;
    
})();