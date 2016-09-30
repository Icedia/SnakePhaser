var game;

game = new Phaser.Game(window.innerWidth - 20, window.innerHeight - 20, Phaser.html5, '');

game.state.add('Menu', Menu);

game.state.add('Game', Game);

game.state.add('Game_Over', Game_Over);

game.state.start('Menu');
