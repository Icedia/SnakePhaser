var snake, pickup, squareSize, updateDelay, direction, new_direction, addNew, cursors, score, speed;
 
var Game = {
 
        preload: function () {
            game.load.image('snake', './assets/images/snake.png');
            game.load.image('pickup', './assets/images/mouse.png');
            game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
        },
 
        create: function () {
            snake = [];
            pickup = {};
            squareSize = 15;
            score = 0;
            updateDelay = 0;
            direction = 'right';
            new_direction = null;
            addNew = false;
 
            cursors = game.input.keyboard.createCursorKeys();
 
            game.stage.backgroundColor = '#228B22';
 
            for (var i = 0; i < 10; i++) {
                snake[i] = game.add.sprite(150 + i * squareSize, 150, 'snake');
            }
 
            this.generatePickUp();
 
        },
 
        update: function () {
            if (cursors.right.isDown && direction != 'left') {
                new_direction = 'right';
            } else if (cursors.left.isDown && direction != 'right') {
                new_direction = 'left';
            } else if (cursors.up.isDown && direction != 'down') {
                new_direction = 'up';
            } else if (cursors.down.isDown && direction != 'up') {
                new_direction = 'down';
            }
 
            speed = 4;
 
 
            updateDelay++;
 
            if (updateDelay % (10 - speed) == 0) {
                var firstCell = snake[snake.length - 1],
                    lastCell = snake.shift(),
                    oldLastCellx = lastCell.x,
                    oldLastCelly = lastCell.y;
 
                if (new_direction) {
                    direction = new_direction;
                    new_direction = null;
                }
 
                if (direction == 'right') {
                    lastCell.x = firstCell.x + 15;
                    lastCell.y = firstCell.y;
                } else if (direction == 'left') {
                    lastCell.x = firstCell.x - 15;
                    lastCell.y = firstCell.y;
                } else if (direction == 'up') {
                    lastCell.x = firstCell.x;
                    lastCell.y = firstCell.y - 15;
                } else if (direction == 'down') {
                    lastCell.x = firstCell.x;
                    lastCell.y = firstCell.y + 15;
                }
                this.pickupCollision();
 
                this.selfCollision(firstCell);
 
                this.wallCollision(firstCell);
       
 
                snake.push(lastCell);
                firstCell = lastCell;
            }
 
            if (addNew) {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }
 
           
    },
 
 
    generatePickUp: function () {
        var randomX = Math.floor(Math.random() * 40) * squareSize,
            randomY = Math.floor(Math.random() * 30) * squareSize;
 
        pickup = game.add.sprite(randomX, randomY, 'pickup');
    },
 
    pickupCollision: function () {
        for (var i = 0; i < snake.length; i++) {
            if (snake[i].x == pickup.x && snake[i].y == pickup.y) {
                addNew = true;
                pickup.destroy();
                this.generatePickUp();
                score++;
            }
        }
    },
 
    selfCollision: function (head) {
        for (var i = 0; i < snake.length - 1; i++) {
            if (head.x == snake[i].x && head.y == snake[i].y) {
                game.state.start('Game_Over');
            }
        }
    },
 
    wallCollision: function (head) {
        if (head.x >= window.innerWidth - 20 || head.x < 0 || head.y >= window.innerHeight - 20 || head.y < 0) {
            game.state.start('Game_Over');
        }
    }
 
 
};