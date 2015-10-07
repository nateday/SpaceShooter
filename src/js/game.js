(function() {
    
    var game = new Phaser.Game(800, 700, Phaser.AUTO, 'space-shooter', { preload: preload, create: create });
    
    function preload() {

        game.load.image('galaxy', 'assets/galaxy.png');
    }
    
    function create() {

        game.add.sprite(0, 0, 'galaxy');
    }
    
})();