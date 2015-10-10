module.exports = (function() {
    
    var db = null;
    
    var GameDB = function() {
        
        var self = this;
        
        self.db = new PouchDB('SpaceShooter');
    };
    
    GameDB.prototype.getPlayerData = function(dataCallback, errCallback) {
        
        var self = this;
        
        self.db.get('player')
            .then(function (player) {
                dataCallback(player);
            })
            .catch(function(error) {
                errCallback(error);
            });    
    };
    
    GameDB.prototype.savePlayerData = function(data, dataCallback, errCallback) {
        
        var self = this;
        
        data._id = 'player';
        
        self.db.put(data)
            .then(function() {
                return self.db.get('player');
            })
            .then(function(player) {
                dataCallback(player);
            })
            .catch(function(err) {
                errCallback(err);
            });   
    };
    
    return GameDB;
    
})();