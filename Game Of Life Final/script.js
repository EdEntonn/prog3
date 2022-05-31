matrix = []

function generateMatrix(side, GrassCount, GrassEaterCount, PredatorCount, BombCount, SpawnerCount){
   
    for (let i = 0; i < side; i++) {  
        let arr = []  
        matrix.push(arr)
        for (let j = 0; j < side; j++) {  
            matrix[i].push(0)    
        }    
    }

    for (let i = 0; i < GrassCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let gr = new Grass(x,y)
            grassArr.push(gr)
            matrix[y][x] = 1;
        }
    }
    for (let i = 0; i < GrassEaterCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let Xt = new Xotaker(x,y)
            xotakerArr.push(Xt)
            matrix[y][x] = 2;
        }
    }
    for (let i = 0; i < PredatorCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let Xt = new Predator(x,y)
            predatorArr.push(Xt)
            matrix[y][x] = 3;
        }
    }

    for (let i = 0; i < BombCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let Xt = new Bomb(x,y)
            BombArr.push(Xt)
            matrix[y][x] = 4;
        }
    }

    for (let i = 0; i < SpawnerCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let Xt = new Spawner(x,y)
            SpawnerArr.push(Xt)
            matrix[y][x] = 6;
        }
    }

}



var side = 10

grassArr = []
xotakerArr = []
predatorArr = []
BombArr = []
SpawnerArr = []


function setup(){

    generateMatrix(60,100,20,10,10,1)
    createCanvas( side * matrix[0].length , side * matrix.length )
    background("grey")

   
 
}

function draw(){

    for(let i in grassArr){
        grassArr[i].mul()
    }

    for(let i in xotakerArr){
        xotakerArr[i].move()
    }

    for(let i in predatorArr){
        predatorArr[i].move()
    }
    for(let i in BombArr){
        BombArr[i].explode()

    }
    for(let i in SpawnerArr){
        SpawnerArr[i].spawn()

    }

   
    for(let y = 0 ; y < matrix.length ; y++){
        for(let x = 0 ; x < matrix[y].length; x++){

            if(matrix[y][x] == 1){
                fill("green")
            }
            else if(matrix[y][x] == 2){
                fill("yellow")
            }
            else if(matrix[y][x] == 3){
                fill("red")
            }
            else if(matrix[y][x] == 4){
                fill("black")
            }
            else if(matrix[y][x] == 5){
                fill("#302007")
            }
            else if(matrix[y][x] == 6){
                fill("#ffcf00")
            }
            else{
                fill("#684C20")
            } 
            rect( x * side , y * side , side , side )
        }

    }
   
   }