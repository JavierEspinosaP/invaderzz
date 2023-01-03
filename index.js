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


let bullets;
let totalBullets = 50;
let level = 1;
let lives = 90;
let score = 0;
let ship;
let speed;
let stats;
let cursors;
let lastFired = 0;
let keyA;
let keyS;
let keyD;
let keyW;
let angle
let bulletCharge;
let powerups;
let text
let emitter
let emitter2
let bg
let stars
let asteroid1
let explosion1
let gravity = 0
let gamePaused = false;
let hits = 0;

function togglePause() {
    gamePaused = !gamePaused;
    if (gamePaused) {
      game.pause();
    } else {
      game.resume();
    }
  }

let game = new Phaser.Game(config);


function startLoader() {
    this.load.image('start', 'assets/start.png');
}

function startCreate() {
    //añadir la imagen de 'start' y escalarla
    this.add.image(400, 300, 'start').setScale(0.2);
    this.input.on('pointerdown', function (pointer) {
        this.scene.start('GameScene');
    }, this);
}

function preload() {
    this.load.image('ship', 'assets/player.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('bullet_charge', 'assets/bullet_charge.png');
    this.load.image('background', 'assets/nebula.jpg');
    this.load.atlas('space', 'assets/space.png', 'assets/space.json');
    this.load.image('stars', 'assets/stars.png');
    this.load.image('asteroid1_0', 'assets/spritesheet_asteroids/asteroid1/frame_00_delay-0.1s.png');
    this.load.image('asteroid1_1', 'assets/spritesheet_asteroids/asteroid1/frame_01_delay-0.1s.png');
    this.load.image('asteroid1_2', 'assets/spritesheet_asteroids/asteroid1/frame_02_delay-0.1s.png');
    this.load.image('asteroid1_3', 'assets/spritesheet_asteroids/asteroid1/frame_03_delay-0.1s.png');
    this.load.image('asteroid1_4', 'assets/spritesheet_asteroids/asteroid1/frame_04_delay-0.1s.png');
    this.load.image('asteroid1_5', 'assets/spritesheet_asteroids/asteroid1/frame_05_delay-0.1s.png');
    this.load.image('asteroid1_6', 'assets/spritesheet_asteroids/asteroid1/frame_06_delay-0.1s.png');
    this.load.image('asteroid1_7', 'assets/spritesheet_asteroids/asteroid1/frame_07_delay-0.1s.png');
    this.load.image('asteroid1_8', 'assets/spritesheet_asteroids/asteroid1/frame_08_delay-0.1s.png');
    this.load.image('asteroid1_9', 'assets/spritesheet_asteroids/asteroid1/frame_09_delay-0.1s.png');
    this.load.image('asteroid1_10', 'assets/spritesheet_asteroids/asteroid1/frame_10_delay-0.1s.png');
    this.load.image('asteroid1_11', 'assets/spritesheet_asteroids/asteroid1/frame_11_delay-0.1s.png');
    this.load.image('asteroid1_12', 'assets/spritesheet_asteroids/asteroid1/frame_12_delay-0.1s.png');
    this.load.image('asteroid1_13', 'assets/spritesheet_asteroids/asteroid1/frame_13_delay-0.1s.png');
    this.load.image('asteroid1_14', 'assets/spritesheet_asteroids/asteroid1/frame_14_delay-0.1s.png');
    this.load.image('asteroid1_15', 'assets/spritesheet_asteroids/asteroid1/frame_15_delay-0.1s.png');
    this.load.image('asteroid1_16', 'assets/spritesheet_asteroids/asteroid1/frame_16_delay-0.1s.png');
    this.load.image('asteroid1_17', 'assets/spritesheet_asteroids/asteroid1/frame_17_delay-0.1s.png');
    this.load.image('asteroid1_18', 'assets/spritesheet_asteroids/asteroid1/frame_18_delay-0.1s.png');
    this.load.image('explosion1', 'assets/explosions/explosion1/explosion1 (1).png');
    this.load.image('explosion2', 'assets/explosions/explosion1/explosion1 (2).png');
    this.load.image('explosion3', 'assets/explosions/explosion1/explosion1 (3).png');
    this.load.image('explosion4', 'assets/explosions/explosion1/explosion1 (4).png');
    this.load.image('explosion5', 'assets/explosions/explosion1/explosion1 (5).png');
    this.load.image('explosion6', 'assets/explosions/explosion1/explosion1 (6).png');
    this.load.image('explosion7', 'assets/explosions/explosion1/explosion1 (7).png');
    this.load.image('explosion8', 'assets/explosions/explosion1/explosion1 (8).png');
    this.load.image('explosion9', 'assets/explosions/explosion1/explosion1 (9).png');
    this.load.image('explosion10', 'assets/explosions/explosion1/explosion1 (10).png');
    this.load.image('explosion11', 'assets/explosions/explosion1/explosion1 (11).png');
    this.load.image('explosion12', 'assets/explosions/explosion1/explosion1 (12).png');
    this.load.image('explosion13', 'assets/explosions/explosion1/explosion1 (13).png');
    this.load.image('explosion14', 'assets/explosions/explosion1/explosion1 (14).png');
    this.load.image('explosion15', 'assets/explosions/explosion1/explosion1 (15).png');
    this.load.image('explosion16', 'assets/explosions/explosion1/explosion1 (16).png');
    this.load.image('explosion17', 'assets/explosions/explosion1/explosion1 (17).png');
    this.load.image('explosion18', 'assets/explosions/explosion1/explosion1 (18).png');
    this.load.image('explosion19', 'assets/explosions/explosion1/explosion1 (19).png');
    this.load.image('explosion20', 'assets/explosions/explosion1/explosion1 (20).png');
    this.load.image('explosion21', 'assets/explosions/explosion1/explosion1 (21).png');
    this.load.image('explosion22', 'assets/explosions/explosion1/explosion1 (22).png');
    this.load.image('explosion23', 'assets/explosions/explosion1/explosion1 (23).png');
    this.load.image('explosion24', 'assets/explosions/explosion1/explosion1 (24).png');

    this.load.image('explosion2_1', 'assets/explosions/explosion2/explosion2 (1).png');
    this.load.image('explosion2_2', 'assets/explosions/explosion2/explosion2 (2).png');
    this.load.image('explosion2_3', 'assets/explosions/explosion2/explosion2 (3).png');
    this.load.image('explosion2_4', 'assets/explosions/explosion2/explosion2 (4).png');
    this.load.image('explosion2_5', 'assets/explosions/explosion2/explosion2 (5).png');
    this.load.image('explosion2_6', 'assets/explosions/explosion2/explosion2 (6).png');
    this.load.image('explosion2_7', 'assets/explosions/explosion2/explosion2 (7).png');
    this.load.image('explosion2_8', 'assets/explosions/explosion2/explosion2 (8).png');
    this.load.image('explosion2_9', 'assets/explosions/explosion2/explosion2 (9).png');
    this.load.image('explosion2_10', 'assets/explosions/explosion2/explosion2 (10).png');



}


let grd;

function create() {

    bg = this.add.tileSprite(400, 300, 800, 600, 'background').setScrollFactor(0);
    stars = this.add.tileSprite(400, 300, 800, 600, 'stars').setScrollFactor(0);
    this.add.image(-730, 480, 'space', 'blue-planet').setOrigin(0).setScrollFactor(0.6).setScale(2)

    this.anims.create({
        key: 'asteroid1_animation',
        frames: [
            { key: 'asteroid1_0' },
            { key: 'asteroid1_1' },
            { key: 'asteroid1_2' },
            { key: 'asteroid1_3' },
            { key: 'asteroid1_4' },
            { key: 'asteroid1_5' },
            { key: 'asteroid1_6' },
            { key: 'asteroid1_7' },
            { key: 'asteroid1_8' },
            { key: 'asteroid1_9' },
            { key: 'asteroid1_10' },
            { key: 'asteroid1_11' },
            { key: 'asteroid1_12' },
            { key: 'asteroid1_13' },
            { key: 'asteroid1_14' },
            { key: 'asteroid1_15' },
            { key: 'asteroid1_16' },
            { key: 'asteroid1_17' },
            { key: 'asteroid1_18' },
        ],
        frameRate: 16,
        repeat: -1
    });

    asteroid1 = this.physics.add.sprite(300, -20, 'asteroid1')
        .play('asteroid1_animation').setScale(0.2)


    this.anims.create({
        key: 'explosion1_animation',
        frames: [
            { key: 'explosion1' },
            { key: 'explosion2' },
            { key: 'explosion3' },
            { key: 'explosion4' },
            { key: 'explosion5' },
            { key: 'explosion6' },
            { key: 'explosion7' },
            { key: 'explosion8' },
            { key: 'explosion9' },
            { key: 'explosion10' },
            { key: 'explosion11' },
            { key: 'explosion12' },
            { key: 'explosion13' },
            { key: 'explosion14' },
            { key: 'explosion15' },
            { key: 'explosion16' },
            { key: 'explosion17' },
            { key: 'explosion18' },
            { key: 'explosion19' },
            { key: 'explosion20' },
            { key: 'explosion21' },
            { key: 'explosion22' },
            { key: 'explosion23' },
            { key: 'explosion24' },
        ],
        frameRate: 16,
        repeat: 0
    });






    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


    //  Using the Scene Data Plugin we can store data on a Scene level
    this.data.set('lives', lives);
    this.data.set('level', 1);
    this.data.set('score', 0);
    this.data.set('Bullets', '0')

    text = this.add.text(50, 50, '', { font: '16px PressStart', fill: '#ffd900' });

    text.setText([
        'Level: ' + this.data.get('level'),
        'Lives: ' + this.data.get('lives'),
        'Score: ' + this.data.get('score'),
        'Bullets: ' + totalBullets
    ]);



    ship = this.physics.add.image(400, 300, 'ship');


    ship.setDamping(true);
    ship.setDrag(0.3);
    //nuevo
    ship.setAngularDrag(400);
    //
    ship.setMaxVelocity(300);

    ship.setDepth(15);

    bulletCharge = this.physics.add.sprite(200, 0, 'bullet_charge');

    bulletCharge.setScale(0.4);

    powerups = this.physics.add.group();
    powerups.add(bulletCharge, ship);

    this.physics.add.overlap(ship, bulletCharge, function () {
        bulletCharge.destroy();
        // aumenta en 10 el contador de balas
        totalBullets += 10;
        // actualiza el contador de balas en la pantalla
        text.setText([
            'Level: ' + level,
            'Lives: ' + lives,
            'Score: ' + score,
            'Bullets: ' + totalBullets
        ]);
    })



    var particles = this.add.particles('space');


    emitter = particles.createEmitter({
        frame: 'blue',
        speed: 100,
        lifespan: {
            onEmit: function (particle, key, t, value) {
                return Phaser.Math.Percent(ship.body.speed, 0, 300) * 500;
            }
        },
        alpha: {
            onEmit: function (particle, key, t, value) {
                return Phaser.Math.Percent(ship.body.speed, 0, 1000);
            }
        },
        // Añado la posición de la nave como la posición de emisión
        x: ship.x,
        y: ship.y,
        angle: {
            onEmit: function (particle, key, t, value) {
                var v = Phaser.Math.Between(-10, 10);
                return (ship.angle - 180) + v;
            }
        },
        scale: { start: 0.6, end: 0 },
        blendMode: 'ADD'
    });



    emitter2 = particles.createEmitter({
        frame: 'yellow',
        speed: 600,
        lifespan: {
            onEmit: function (particle, key, t, value) {
                return Phaser.Math.Percent(100, 0, 300) * 500;
            }
        },
        alpha: {
            onEmit: function (particle, key, t, value) {
                return Phaser.Math.Percent(100, 0, 1000);
            }
        },
        x: asteroid1.x,
        y: asteroid1.y,
        angle: {
            onEmit: function (particle, key, t, value) {
                var v = Phaser.Math.Between(-10, 10);
                return (-90) + v;
            }
        },
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });




    var Bullet = new Phaser.Class({

        Extends: Phaser.Physics.Arcade.Image,

        initialize:

            function Bullet(scene) {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
                this.speed = Phaser.Math.GetSpeed(600, 1);

            },

        fire: function (x, y) {

            // Almacenar la rotación de la nave cuando se dispara la bala
            this.rotation = ship.rotation;

            // Establecer la posición inicial de la bala y hacerla visible y activa en el juego
            const xBullet = Math.sin(this.rotation) * 30;
            const yBullet = Math.cos(this.rotation) * 30;
            this.setPosition(x + xBullet, y - yBullet);
            this.setActive(true);
            this.setVisible(true);


        },

        update: function (time, delta) {

            // Calcular la velocidad en el eje x e y a partir de la rotación de la bala y la velocidad deseada
            const xVelocity = Math.sin(this.rotation) * this.speed;
            const yVelocity = Math.cos(this.rotation) * this.speed;

            // Actualizar la posición de la bala en función de la velocidad en el eje x e y
            this.y -= yVelocity * delta;
            this.x += xVelocity * delta;

            // Ocultar y desactivar la bala si sale de la pantalla
            if (this.y < -30 || this.y > 630 || this.x < -30 || this.x > 830) {
                this.setActive(false);
                this.setVisible(false);
            }


            else if (Math.abs(this.y - asteroid1.y) < 20 && Math.abs(this.x - asteroid1.x) < 20){
                this.setActive(false);
                this.setVisible(false);
                hits+=1;
                if (hits == 3) {
                    asteroid1.destroy();
                    asteroid1 = null
                    emitter2.stop();
                    hits = 0;
                }
                console.log(hits)
            }


            text.setText([
                'Level: ' + level,
                'Lives: ' + lives,
                'Score: ' + score,
                'Bullets: ' + totalBullets
            ]);

        }

    });

    bullets = this.add.group({
        defaultKey: 'bullet',
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true,
        collideWorldBounds: true
    });
    console.log(bullets);

    fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    this.physics.overlap(bullets, asteroid1, function(bullet, asteroid) {
        // Incrementa la variable `hits` del asteroide en 1
        hits+=1;
        console.log(hits);
        // Si el asteroide ha sido golpeado tres veces, destrúyelo
        if (hits == 3) {
            asteroid.destroy();
            asteroid = null;
            hits = 0;
        }
    }, null, this);



    cursors = this.input.keyboard.createCursorKeys();

    speed = Phaser.Math.GetSpeed(300, 1);
    console.log(cursors);
}

function update(time, delta) {

    gravity = time / 100000


    if (asteroid1) {
        // actualiza la posición del sprite
        asteroid1.y += (1 * (gravity + 0.3) * ((asteroid1.y / 15) + 21)) / 30 // mueve el sprite 10 pixels hacia abajo en cada frame
        // si el sprite se sale de la pantalla, destrúyelo
        emitter2.setLifespan(asteroid1.y / 2)
        emitter2.setAlpha((asteroid1.y / 3000));


        if (asteroid1.y > this.scale.height) {
            lives -= 1;

            this.anims.create({
                key: 'explosion1_animation',
                frames: [
                    { key: 'explosion1' },
                    { key: 'explosion2' },
                    { key: 'explosion3' },
                    { key: 'explosion4' },
                    { key: 'explosion5' },
                    { key: 'explosion6' },
                    { key: 'explosion7' },
                    { key: 'explosion8' },
                    { key: 'explosion9' },
                    { key: 'explosion10' },
                    { key: 'explosion11' },
                    { key: 'explosion12' },
                    { key: 'explosion13' },
                    { key: 'explosion14' },
                    { key: 'explosion15' },
                    { key: 'explosion16' },
                    { key: 'explosion17' },
                    { key: 'explosion18' },
                    { key: 'explosion19' },
                    { key: 'explosion20' },
                    { key: 'explosion21' },
                    { key: 'explosion22' },
                    { key: 'explosion23' },
                    { key: 'explosion24' },
                ],
                frameRate: 16,
                repeat: 0
            });
            explosion1 = this.physics.add.sprite(asteroid1.x, 550, 'explosion1')
            .play('explosion1_animation').setScale(0.5)
            setTimeout(function () {
                explosion1.destroy();
                explosion1 = null;
            }, 1500);

            asteroid1.destroy();
            asteroid1 = null; // establece la variable en null para indicar que ya no existe

            text.setText([
                'Level: ' + level,
                'Lives: ' + lives,
                'Score: ' + score,
                'Bullets: ' + totalBullets
            ]);
        }
        if (lives == 0) {
            this.scene.pause();
        }

    }
    else {
        this.anims.create({
            key: 'asteroid1_animation',
            frames: [
                { key: 'asteroid1_0' },
                { key: 'asteroid1_1' },
                { key: 'asteroid1_2' },
                { key: 'asteroid1_3' },
                { key: 'asteroid1_4' },
                { key: 'asteroid1_5' },
                { key: 'asteroid1_6' },
                { key: 'asteroid1_7' },
                { key: 'asteroid1_8' },
                { key: 'asteroid1_9' },
                { key: 'asteroid1_10' },
                { key: 'asteroid1_11' },
                { key: 'asteroid1_12' },
                { key: 'asteroid1_13' },
                { key: 'asteroid1_14' },
                { key: 'asteroid1_15' },
                { key: 'asteroid1_16' },
                { key: 'asteroid1_17' },
                { key: 'asteroid1_18' },
            ],
            frameRate: 16,
            repeat: -1
        });

        asteroid1 = this.physics.add.sprite(Phaser.Math.Between(30, this.scale.width - 30), 0, 'asteroid1')
            .play('asteroid1_animation').setScale(0.2)


    }





    // comprueba si el sprite 'bulletCharge' ha sido creado
    if (bulletCharge) {
        // actualiza la posición del sprite
        bulletCharge.y += 2; // mueve el sprite 10 pixels hacia abajo en cada frame
        // si el sprite se sale de la pantalla, destrúyelo
        if (bulletCharge.y > this.scale.height) {
            bulletCharge.destroy();
            bulletCharge = null; // establece la variable en null para indicar que ya no existe
        }
    }
    else {
        // si el sprite no existe, crea uno nuevo con coordenadas x aleatorias
        bulletCharge = this.physics.add.sprite(Phaser.Math.Between(30, this.scale.width - 30), 0, 'bullet_charge');
        bulletCharge.setScale(0.4);
        this.physics.add.overlap(ship, bulletCharge, function () {
            bulletCharge.destroy();
            // aumenta en 10 el contador de balas
            totalBullets += 10;
            // actualiza el contador de balas en la pantalla
            text.setText([
                'Level: ' + level,
                'Lives: ' + lives,
                'Score: ' + score,
                'Bullets: ' + totalBullets
            ]);
        });
    }


    // Actualizo la posición de emisión en cada frame
    emitter.setPosition(ship.x, ship.y);

    if (asteroid1) {
        emitter2.setPosition(asteroid1.x, asteroid1.y)
    }



    let physics = this.physics

    if (keyW.isDown) {
        physics.velocityFromRotation(ship.rotation + 300, 500, ship.body.acceleration);
    }
    else {
        ship.setAcceleration(0);
    }

    if (keyA.isDown) {
        ship.setAngularVelocity(-300);
    }
    else if (keyD.isDown) {
        ship.setAngularVelocity(300);
    }
    else {
        ship.setAngularVelocity(0);
    }

    if (cursors.space.isDown && time > lastFired) {
        // Comprobar el número de balas disparadas
        if (totalBullets > 0) {
            
            // Crear una nueva bala y dispararla
            const bullet = bullets.get();
            if (bullet) {
                bullet.fire(ship.x, ship.y);
                lastFired = time + 100;
                totalBullets--; // Incrementar el contador de balas disparadas
            }
        } else {
            // Si se ha disparado el número máximo de balas permitido, deshabilitar el disparo
            lastFired = time + 100;
        }
    }

    bg.tilePositionY += 0.2
    stars.tilePositionY += 0.4
    this.physics.world.wrap(ship, 32);
}