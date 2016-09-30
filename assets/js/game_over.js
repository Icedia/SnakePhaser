var Game_Over = {

    preload: function () {
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create: function () {
        this.add.button(0, 0, 'gameover', this.startGame, this);

    },

    startGame: function () {
        this.state.start('Game');
    }
};