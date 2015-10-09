module.exports = (function() {
    
    var db = null;
    
    var GameDB = function() {
        
        var self = this;
        
        self.db = new PouchDB('SpaceShooter');
    };
    
    return GameDB;
    
})();