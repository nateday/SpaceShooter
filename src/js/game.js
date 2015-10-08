(function() {
    
    var preloader = require('./preloader');
    var level = require('./level');
    
    var game = new Phaser.Game(800, 700, Phaser.AUTO, 'space-shooter');
    
    game.player = null;
    
    game.state.add('level', level);
    game.state.add('preloader', preloader, true);
 
})();