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
    scene: [startConfig, demoSceneConfig]
};

let game = new Phaser.Game(config);

game.canvas.willReadFrequently = true;


function startLoader() {

    this.load.image('start', 'assets/start.png');
    this.scene.pause();
}

function startCreate() {
    //añadir la imagen de 'start' y escalarla
    this.add.image(400, 300, 'start').setScale(0.2);

    this.input.on('pointerdown', function (pointer) {
        this.scene.start('GameScene');
        startTime = this.time.now;
    }, this);
}

let grd;



