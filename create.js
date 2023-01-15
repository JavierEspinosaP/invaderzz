function create() {


    //Añade la musica de fondo y pone el volumen a 0.1
    backgroundMusic1 = this.sound.add('backgroundMusic1');
    backgroundMusic2 = this.sound.add('backgroundMusic2');
    shipUpSound = this.sound.add('startUp')
    shipDownSound = this.sound.add('powerDown')
    laserShoot = this.sound.add('laser')
    laserShoot.setVolume(0.2).setDetune(-400)
    backgroundMusic1.play()
    bulletImpactSound = this.sound.add('bulletImpact')
    bulletImpactSound.setVolume(0.2)
    asteroidDestroyedSound = this.sound.add('asteroidDestroyed')
    asteroidDestroyedSound.setVolume(0.3).setDetune(-1000).setRate(2)
    asteroidImpactSound = this.sound.add('asteroidImpact')
    asteroidImpactSound.setVolume(0.3).setDetune(-300)
    bulletChargeSound = this.sound.add('bulletCharge')
    bulletChargeSound.setVolume(0.2).setDetune(300)
    lateralMovementSound = this.sound.add('lateralMovement')
    lateralMovementSound.setVolume(0.2)
    // calibratingSystemSound = this.sound.add('calibratingSystem');
    // calibratingSystemSound.play()
    // calibratingSystemSound.setVolume(0.2);       


    // Reproduce la pista de audio y desvanece su volumen al mismo tiempo
    this.plugins.get('rexsoundfadeplugin').fadeIn(backgroundMusic1, 5000, 0.5, 0);



    powerUp = this.sound.add('powerUp');
    powerUp.play()
    powerUp.setVolume(0.3);
    powerUp.setDetune(-1200);
    powerUp.setRate(2.0)


    time = 0;
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


    this.anims.create({
        key: 'explosion2_animation',
        frames: [
            { key: 'explosion2_1' },
            { key: 'explosion2_2' },
            { key: 'explosion2_3' },
            { key: 'explosion2_4' },
            { key: 'explosion2_5' },
            { key: 'explosion2_6' },
            { key: 'explosion2_7' },
            { key: 'explosion2_8' },
            { key: 'explosion2_9' },
            { key: 'explosion2_10' },
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
    ship.setDrag(0.5);
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
        bulletChargeSound.play();
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

            if (asteroid1) {
                if (Math.abs(this.y - asteroid1.y) < 20 && Math.abs(this.x - asteroid1.x) < 20) {
                    this.setActive(false);
                    this.setVisible(false);
                    hits += 1;

                    if (hits == 3) {
                        asteroidDeathX = asteroid1.x;
                        asteroidDeathY = asteroid1.y;
                        asteroid1.destroy();
                        asteroid1 = null
                        emitter2.stop();
                        hits = 0;
                        score += 100;
                    }
                }
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


    fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    this.physics.overlap(bullets, asteroid1, function (bullet, asteroid) {
        // Incrementa la variable `hits` del asteroide en 1
        hits += 1;

        // Si el asteroide ha sido golpeado tres veces, destrúyelo pasado un segundo
        if (hits == 3) {
            asteroid1.destroy();
            asteroid1 = null
            emitter2.stop();
            hits = 0;
        }
    }, null, this);



    cursors = this.input.keyboard.createCursorKeys();

    speed = Phaser.Math.GetSpeed(300, 1);
}