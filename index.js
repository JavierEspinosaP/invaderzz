


let startConfig = {
    key: 'start',
    active: true,
    preload: startLoader,
    create: startCreate
}

var demoSceneConfig = {
    key: 'GameScene',
    active: false,
    visible: false,
    preload: preload,
    create: create,
    update: update
};

let gameOverConfig = {
    key: 'gameOver',
    active: false,
    visible: false,
    preload: gameOverLoader,
    create: gameOverCreate,
    update: gameOverUpdate
}


var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            //mio
            fps: 60,
            gravity: { y: 0 }
        }
    },
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [startConfig, demoSceneConfig, gameOverConfig],
    failIfMajorPerformanceCaveat: true
};

let game = new Phaser.Game(config);



function startLoader() {

    this.load.image('start', 'assets/start.png');
    this.scene.pause();
}

function startCreate() {
    //añadir la imagen de 'start' y escalarla
    this.add.image(400, 300, 'start').setScale(0.2);

    //añadir un texto con las instrucciones
    this.add.text(400, 500, 'W: acelerar, A: izquierda, D: derecha, SPACE: disparar', { font: '15px Courier', fill: '#ffd900' }).setOrigin(0.5);
  
    this.input.on('pointerdown', function (pointer) {
        this.scene.start('GameScene');
        startTime = this.time.now;
    }, this);
}

function gameOverLoader() {
    this.load.image('gameOver', 'assets/gameOver.png');
    // this.scene.pause();
}

function gameOverCreate() {
    this.add.image(400, 300, 'gameOver').setScale(0.2);
    lives = 3
    totalBullets = 50;
    shipEnergy = 300;
    numberOfGames++;
    this.add.text(400, 450, 'Tu puntuación: ' + score,  { font: '15px Courier', fill: '#ffd900' }).setOrigin(0.5);
    score = 0
    console.log(this.scene.key);
}

function gameOverUpdate() {
    enter =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    
    if (enter.isDown) {
        this.scene.start('GameScene');
    }
        
}

let grd;



