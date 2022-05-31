class Grass {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0;
        this.direction = [

            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
        matrix[this.y][this.x] = 1
    }

    chooseCell(ch) {
        var found = [];

        for (let i in this.direction) {

            let x = this.direction[i][0];
            let y = this.direction[i][1];

            if (x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1) {

                if (matrix[y][x] == ch) {
                    found.push(this.direction[i])
                }

            }
        }

        return found
    }


    mul() {
        this.multiply++

        let emptyCells = this.chooseCell(0)
        let randomCell = random(emptyCells)

        if (this.multiply >= 4 && randomCell != undefined) {

            let x = randomCell[0]
            let y = randomCell[1]

            matrix[y][x] = 1
            let gr = new Grass(x, y)
            grassArr.push(gr)
            this.multiply = 0
        }
    }

}

class Xotaker {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 30
        this.direction = []
    }

    updateDirection() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(ch) {
        this.updateDirection()
        var found = [];
        for (let i in this.direction) {

            let x = this.direction[i][0];
            let y = this.direction[i][1];

            if (x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1) {

                if (matrix[y][x] == ch) {
                    found.push(this.direction[i])
                }

            }
        }

        return found
    }

    move() {
        this.energy--
        let arr = this.chooseCell(1)
        if (arr.length > 0) {
            this.eat()
            if (this.energy >= 15) {
                this.mul()
            }
        }
        else {
            arr = this.chooseCell(0)
            let emptyCell = random(arr)
            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 2
                matrix[this.y][this.x] = 0

                this.x = x
                this.y = y
            }

            if (this.energy <= 0) {
                this.die()
            }
        }




    }
    eat() {
        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in xotakerArr) {
            if (this.x == xotakerArr[i].x && this.y == xotakerArr[i].y) {
                xotakerArr.splice(i, 1)
                break;
            }
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newGrassEater = new Xotaker(newCell[0], newCell[1]);
            xotakerArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }

}


class Predator {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 80
        this.direction = []
    }

    updateDirection() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(ch) {
        this.updateDirection()
        var found = [];
        for (let i in this.direction) {

            let x = this.direction[i][0];
            let y = this.direction[i][1];

            if (x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1) {

                if (matrix[y][x] == ch) {
                    found.push(this.direction[i])
                }

            }
        }

        return found
    }

    move() {
        this.energy--
        let arr = this.chooseCell(2)
        if (arr.length > 0) {
            this.eat()
            if (this.energy >= 50) {
                this.mul()
            }
        }
        else {
            arr = this.chooseCell(0)
            let emptyCell = random(arr)
            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 3
                matrix[this.y][this.x] = 0



                this.x = x
                this.y = y

            }

            if (this.energy <= 0) {
                this.die()
            }
        }




    }
    eat() {
        var newCell = random(this.chooseCell(2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;

            for (var i in xotakerArr) {
                if (newX == xotakerArr[i].x && newY == xotakerArr[i].y) {
                    xotakerArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 5;
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1)
                break;
            }
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newPredator = new Predator(newCell[0], newCell[1]);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 35;
        }
    }

}

class Bomb {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.direction = [

            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
        }
    explode() {
        for (let i in this.direction) {
            let newX = this.direction[i][0];
            let newY = this.direction[i][1];
        

        if (newY < matrix.length && newY >= 0 && newX < matrix[0].length && newX >= 0 ) {
            matrix[newY][newX] = 5
        }
    }
}
}
            
    

class Spawner {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.direction = [

            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]

        ]
        matrix[this.y][this.x] = 6;
    }

    spawn() {
        if (xotakerArr.length == 0) {
            for (let i = 0; i <= 10; i++) {
                let x = Math.round(random(0, side - 1))
                let y = Math.round(random(0, side - 1))
                if (matrix[y][x] == 0 || 1) {
                    let Xt = new Xotaker(x, y)
                    xotakerArr.push(Xt)
                    matrix[y][x] = 2;
                }
            }
        }
        if (predatorArr.length == 0) {
            for (let i = 0; i <= 5; i++){
            let x = Math.round(random(0, side - 1))
            let y = Math.round(random(0, side - 1))
            if (matrix[y][x] == 0 || 1) {
                var newPredator = new Predator(x, y)
                predatorArr.push(newPredator)
                matrix[y][x] = 3;
            }
        }
    }
    if (grassArr.length == 0) {
        for (let i = 0; i <= 50; i++) {
            let x = Math.round(random(0, side - 1))
            let y = Math.round(random(0, side - 1))
            if (matrix[y][x] == 0) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
                matrix[y][x] = 2;
            }
        }
    }
}
}