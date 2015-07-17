function updateSnake(snakeObj) {
    var last = {},
        temp = {};

    snakeObj.members.forEach(function (pos) {
        if (!last.x) {
            last.x = pos.x;
            last.y = pos.y;
            pos.x += snakeObj.direction.x;
            pos.y += snakeObj.direction.y;
        }
        else {
            temp.x = pos.x;
            temp.y = pos.y;
            pos.x = last.x;
            pos.y = last.y;
            last.x = temp.x;
            last.y = temp.y;
        }
    });
}

// key press handlers
document.onkeypress = function (e) {
    e = e || window.event;
    var charCode = (typeof e.which == 'number') ? e.which : e.keyCode,
        newDir = {};

    if (charCode == 87 || charCode == 119) { //w
        newDir = { x: 0, y: -1 };
        if (validDirection(snake.direction,newDir)) {
            snake.direction = newDir;
        }
    }
    else if (charCode == 83 || charCode == 115) { //s
        newDir = { x: 0, y: 1 };
        if (validDirection(snake.direction, newDir)) {
            snake.direction = newDir;
        }
    }
    else if (charCode == 65 || charCode == 97) { //a
        newDir = { x: -1, y: 0 };
        if (validDirection(snake.direction, newDir)) {
            snake.direction = newDir;
        }
    }
    else if (charCode == 68 || charCode == 100) { //d
        newDir = { x: 1, y: 0 };
        if (validDirection(snake.direction, newDir)) {
            snake.direction = newDir;
        }
    }
    else if (charCode == 32) {
        togglePause(game);
    }
}

// validate direction
function validDirection(direction, newDirection) {
    if (Math.abs(direction.x) === Math.abs(newDirection.x) || Math.abs(direction.y) === Math.abs(newDirection.y)) {
        return false;
    }

    return true;
}

function togglePause(gameObject) {
    if (gameObject.running) {
        gameObject.running = false;
    }
    else {
        gameObject.running = true;
    }
}

function snakeCheck(snakeObj) {
    var arr = snakeObj.members,
        len = arr.length;

    if (arr[0].x <= 1 || arr[0].x >= boardWidth - 1 || arr[0].y <= 1 || arr[0].y >= boardHeight - 1) {
        return 'hit-wall';
    }

    for (var i = 0; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
            if (arr[i].x === arr[j].x && arr[i].y === arr[j].y) {
                return 'self-eat';
            }
        }
    }
    
    if (snakeObj.members[0].x == food.x && snakeObj.members[0].y == food.y) {
        eatFood(snakeObj);
    }

    return 'running';
}

function eatFood(snakeObj) {
    food = Object.create(foodObj).init();
    snakeObj.length++;
    snakeObj.score++;
    snakeObj.members.push({
        x: snakeObj.members[snakeObj.length - 2].x,
        y: snakeObj.members[snakeObj.length - 2].y,
    });
    game.increaseSpeed();
}

function checkEnding(snakeObj) {
    var endCode = snakeCheck(snakeObj);
    if (endCode === 'hit-wall') {
        endGame('Wall encountered!', snakeObj.score);
    }
    if (endCode === 'self-eat') {
        endGame('Snake bite!', snakeObj.score);
    }
}

function endGame(reason,score) {
    var highScore = 'unsupported';
    if (typeof (Storage) !== "undefined") {
        if (!localStorage.getItem('highScore') || score > localStorage.getItem('highScore')) {
            localStorage.setItem('highScore', score);
        }
        highScore = localStorage.getItem('highScore');
    } else {
        // Sorry! No Web Storage support..
    }
    drawGameOver(score, highScore);
    newGame();
}

function newGame() {
    food = Object.create(foodObj).init();
    game = Object.create(gameObject).init();
    snake = Object.create(snakeObj).init();
}

setInterval(function () {
    if (game.running) {
        updateSnake(snake);
        drawBoard();
        drawFood(food);
        drawSnake(snake);
        drawScore(snake);
        checkEnding(snake);
    }
}, game.speed);