module.exports = (function() {
    
    var Ship = require('./ship');
    
    var ship = null;
    
    var Player = function(game) {
        
        var self = this;
        
        self.ship = new Ship(game);
        
    };
    
    Player.prototype.getHudText = function() {
        return this.ship.getHudText();
    };
    
    return Player;
    
})();