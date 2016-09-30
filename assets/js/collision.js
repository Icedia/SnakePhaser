   





    collision.prototype.pickupCollision: function () {
        for (var i = 0; i < snake.length; i++) {
            if (snake[i].x == pickup.x && snake[i].y == pickup.y) {
                addNew = true;
                pickup.destroy();
                this.generatePickUp();
                score++;
            }
        }
    },
 
     collision.prototype.selfCollision: function (head) {
        for (var i = 0; i < snake.length - 1; i++) {
            if (head.x == snake[i].x && head.y == snake[i].y) {
                game.state.start('Game_Over');
            }
        }
    },
 
     collision.prototype.wallCollision: function (head) {
        if (head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0) {
            game.state.start('Game_Over');
        }
    }