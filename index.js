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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let bullets;
let bulletsFired = 0;
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

var game = new Phaser.Game(config);

function preload() {
    this.load.image('ship', 'assets/player.png');
    this.load.image('bullet', 'assets/bullet.png');
}

function create() {

    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);




    ship = this.physics.add.image(400, 300, 'ship');

    ship.setDamping(true);
    ship.setDrag(0.3);
    //nuevo
    ship.setAngularDrag(400);
    //
    ship.setMaxVelocity(300);


    const x = this.scale.width * 0.5
    const y = this.scale.height * 0.5

    // // red rectangle
    // const rect = this.add.rectangle(x, y, 100, 50, 0xff0000, 1)


    var Bullet = new Phaser.Class({

        Extends: Phaser.Physics.Arcade.Image,

        initialize:

            function Bullet(scene) {
                //esto es lo mio
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



        }

    });

    bullets = this.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
    });
    console.log(bullets);

    fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



    cursors = this.input.keyboard.createCursorKeys();

    speed = Phaser.Math.GetSpeed(300, 1);
    console.log(cursors);
}

function update(time, delta) {

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
        if (bulletsFired < 50) {
            // Crear una nueva bala y dispararla
            const bullet = bullets.get();
            if (bullet) {
                bullet.fire(ship.x, ship.y);
                lastFired = time + 100;
                bulletsFired++; // Incrementar el contador de balas disparadas
            }
        } else {
            // Si se ha disparado el número máximo de balas permitido, deshabilitar el disparo
            lastFired = time + 100;
        }
    }
    else if (cursors.space.isUp) {

    }
    this.physics.world.wrap(ship, 32);
}