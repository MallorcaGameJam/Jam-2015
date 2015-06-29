//score esta definida fuera para poder enviarla por AJAX
var score = 0;
var music;
var secret = 'a1';

window.onload = function() {

    var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });
    var intro = true;
    var startGame = false;
    var gameSpeed = -300;
    var countEnemies = 0;
    var countEnemiesLevelOne = 30;
    var x2State = false;
    var x4State = false;
    var pillState = false;
    var countx2 = 0;
    var numx2tox4 = 5;
    var x2Icon;
    var x4Icon;
    var pillIcon;
    var timer = 10;
    var miniTimer;
    var ranking = false;

    var enemyLevelOne = [   {x: 800, y: 19, sprite: 'wall1'},
                            {x: 800, y: 231, sprite: 'wall1'},
                            {x: 800, y: 120, sprite: 'wall1'},
                            {x: 800, y: 290, sprite: 'wall1'}];

    var enemyLevelTwo = [   {x: 800, y: 19, sprite: 'wall2'},
                            {x: 800, y: 231, sprite: 'wall2'},
                            {x: 800, y: 120, sprite: 'wall2'}];



    function preload () {

        game.load.image('logo', 'assets/images/phaser.png');
        game.load.image('sky', 'assets/images/sky02.png');
        game.load.image('spaceship', 'assets/images/spaceship2.png');
        game.load.image('spaceshipfire', 'assets/images/spaceshipfire.png');
        game.load.image('spaceshipBig', 'assets/images/spaceship.png');
        game.load.image('spaceshipmini', 'assets/images/spacesupermini.png');
        game.load.image('frame', 'assets/images/walls2.png');
        game.load.image('introBackground', 'assets/images/intro.png');
        game.load.image('energy2', 'assets/images/bolt_bronze.png');
        game.load.image('energy4', 'assets/images/bolt_gold.png');
        game.load.image('x2', 'assets/images/x2.png');
        game.load.image('x4', 'assets/images/x4.png');
        game.load.image('pill_blue', 'assets/images/pill_blue.png');
        game.load.image('pill_icon', 'assets/images/pill_icon.png');

        //Level One
        game.load.image('wall1','assets/images/miniwall1.png');

        //Level Two
        game.load.image('wall2','assets/images/miniwall2.png');

        game.load.audio('music', 'assets/music/RoccoW_-_wbfdfbgkg.mp3');


    }

    function create () {
        game.time.advancedTiming = true
        createIntro();
        createMusic();
    }

    function update() {
            checkIntro();
    		mainLoop();
    }

    function render() {
        /*if(startGame)
        {
            game.debug.text("Próximo enemigo: " + game.time.events.duration.toFixed(0), 32, 32);
            game.debug.text("FPS: "+game.time.fps,32,48);
        }*/
    }

    function createIntro() {
        introImage = game.load.image(0, 0, 'introBackground');

        text1 = "Reporte de Misión AR-2047\nLa misión ha fracasado. Nos persigue una flota de acorazados Z-16.\nHemos perdido toda comunicación con el exterior\ny nuestra única salvación es salir de aquí lo más rapido posible.\n\nY recuerda, sólo tienes un intento para sobrevivir.";
        text2 = "Clica para empezar a jugar";
        textIntro = game.add.text(0, 0, text1, { font: "bold 14px Arial", fill: "white" });

        introSpaceship = game.add.sprite(100, game.world.centerY, 'spaceshipBig');

        //Move introspaceship
        game.physics.arcade.enable(introSpaceship);
        introSpaceship.body.velocity.x = 50;

        textIntro2 = game.add.text(400, 350, text2, { font: "bold 14px Arial", fill: "white" });
    }

    function checkIntro()
    {
        if(intro)
        {
            if(introSpaceship.body.x > 350)
            {
                introSpaceship.scale.x = -1; //flipped
                introSpaceship.body.velocity.x = -50;
            }
            else if(introSpaceship.body.x < 100)
            {
                introSpaceship.scale.x = 1; //unflipped
                introSpaceship.body.velocity.x = 50;
            }

            if (game.input.activePointer.isDown)
            {
                introImage.visible = false;
                textIntro.destroy();
                textIntro2.destroy();
                introSpaceship.destroy();

                createBackground();

                intro = false;
            }
        }
    }

    function mainLoop()
    {
        if(!intro)
        {
            //Funciones que suceden solo una vez, después de la intro
            if(!startGame)
            {
                createPlayer();
                spawnEnemies();
                spawnPowerUps();
                spawnPills();

                startGame = true;

                if(jQuery('.valueSound').val() == 'true')
                    music.play();
            }
            //Funciones que suceden a cada frame
            checkControls();
            checkCollisions();
            destroyEnemies();
            destroyPowerUps();
            showInfo();
        }
    }

	function createBackground() {
        var backgroundImage = game.add.image(game.world.centerX, game.world.centerY-100, 'sky');
        backgroundImage.anchor.setTo(0.5, 0.5);
        backgroundImage.scrollFactorX = 3;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        frameGroup = game.add.group();

        frameGroup.enableBody = true;

        frameTop = frameGroup.create(0,0, 'frame');
        frameTop.body.immovable = true;
        frameBot = frameGroup.create(0, game.world.height - 20, 'frame');
        frameBot.body.immovable = true;

        infoGroup = game.add.group();
        scoreText = game.add.text(375, 20, "Puntuación: " +score, { font: "bold 24px Arial", fill: "white" },infoGroup);
        game.world.bringToTop(infoGroup);
    }

    function createPlayer()
    {
    		player = game.add.sprite(game.world.centerX-250, game.world.centerY, 'spaceship');

    		game.physics.arcade.enable(player);
    		player.body.gravity.y = 1000;
    		player.body.velocity.x = 0;
    }

	function checkControls()
    {
	    if (game.input.activePointer.isDown)
	    {
	        player.body.velocity.y = gameSpeed;
	    }
    }

    function spawnEnemies()
    {
        wallGroup = game.add.group();
        wallGroup.enableBody = true;

        levelOneLoop = game.time.events.loop(Phaser.Timer.SECOND * 1,createEnemy, this);
    }

    function createEnemy()
    {
        if(countEnemies < countEnemiesLevelOne)
            var enemyPositions = enemyLevelOne;
        else
            var enemyPositions = enemyLevelTwo;

        var rand = enemyPositions[Math.floor(Math.random() * enemyPositions.length)];
        //rand = enemyPositions[4];
                                 
        var enemy = wallGroup.create(rand.x,rand.y,rand.sprite);

        game.physics.enable(enemy, Phaser.Physics.ARCADE);
        enemy.body.velocity.x = gameSpeed;
        enemy.body.immovable = true;

        game.world.swap(wallGroup, infoGroup);

        countEnemies++;
    }

    //Esta función se divide en 2 ya que esperamos medio segundo a empezar el evento
    function spawnPowerUps()
    {
        powersGroup = game.add.group();
        powersGroup.enableBody = true;

        firstPowerUpTimer = game.time.events.add(Phaser.Timer.SECOND * 0.5, spawnRealPowerUps, this);
    }

    function spawnRealPowerUps()
    {
        game.time.events.loop(Phaser.Timer.SECOND * 5,createPowerUp, this);
    }

    function createPowerUp()
    {
        if(!x4State)
        {
            var bonus = [   {x: 800, y: 19, sprite: 'energy2'},
                            {x: 800, y: 231, sprite: 'energy2'}];
        }
        else
        {
            var bonus = [   {x: 800, y: 19, sprite: 'energy4'},
                            {x: 800, y: 231, sprite: 'energy4'}];
        }

        var rand = bonus[Math.floor(Math.random() * bonus.length)];

        var powerup = powersGroup.create(rand.x,rand.y,rand.sprite);

        game.physics.enable(powerup, Phaser.Physics.ARCADE);
        powerup.body.velocity.x = gameSpeed;
        powerup.body.immovable = true;
    }

    //se divide en 2 por lo mismo que el anterior
    function spawnPills()
    {
        pillGroup = game.add.group();
        pillGroup.enableBody = true;

        firstPillTimer = game.time.events.add(Phaser.Timer.SECOND * 0.25, spawnRealPills, this);
    }

    function spawnRealPills()
    {
        game.time.events.loop(Phaser.Timer.SECOND * 30,createPill, this);
    }

    function createPill()
    {
        var pillPositions = [     {x: 800, y: 19},
                                    {x: 800, y: 231}];

        var rand = pillPositions[Math.floor(Math.random() * pillPositions.length)];

        var pill = pillGroup.create(rand.x,rand.y,'pill_blue');

        game.physics.enable(pill, Phaser.Physics.ARCADE);
        pill.body.velocity.x = gameSpeed;
        pill.body.immovable = true;
    }

    function checkCollisions()
    {
			game.physics.arcade.overlap(player, frameGroup, explosionPlayer, null, this);
            game.physics.arcade.overlap(player, wallGroup, explosionPlayer, null, this);
            game.physics.arcade.overlap(player, powersGroup, powerUpSum, null, this);
            game.physics.arcade.overlap(player, pillGroup, pillSum, null, this);
    }

    function explosionPlayer()
    {
    	player.loadTexture('spaceshipfire',0);
        player.body.gravity.y = 0;
        player.body.velocity.y = 0;

        wallGroup.forEachAlive(function(m) {
            m.body.velocity.x = 0;
        }, this);

        powersGroup.forEachAlive(function(m) {
            m.body.velocity.x = 0;
        }, this);

        pillGroup.forEachAlive(function(m) {
            m.body.velocity.x = 0;
        }, this);

        gameOver();

    }

    function destroyEnemies()
    {
        wallGroup.forEachAlive(function(m) {
            if(m.body.x < 0)
            {
                m.kill();

                if(x2State == false && x4State == false)
                    score++;
                else if(x2State == true)
                    score += 2;
                else if(x4State == true)
                    score += 4;

                secret = 'a'+(score+1);
            }
        }, this);
    }

    function showInfo()
    {
        scoreText.setText(score);
        game.world.bringToTop(scoreText);

        if(pillState)
            pillText.setText(timer);
    }

    function powerUpSum(player,powerup)
    {
        powerup.kill();

        if(countx2 == 0)
            x2Icon = game.add.sprite(700,25, 'x2');

        if(countx2 < numx2tox4)
        {
            countx2++;
            x2State = true;
        }

        if(countx2 == numx2tox4)
        {
            x2Icon.kill();
            countx2++;
            x4Icon = game.add.sprite(700,25, 'x4');
        }

        if(countx2 >= numx2tox4)
        {
            x2State = false;
            x4State = true;
        }
    }

    function pillSum(player,pill)
    {
        pill.kill();

        if(pillState == false)
        {
            miniTimer = game.time.create(true);
            miniTimer = game.time.events.loop(Phaser.Timer.SECOND, updateTimer);
            pillText = game.add.text(680, 35, timer, { font: "bold 20px Arial", fill: "white" });
        }

        pillState = true;
        pillIcon = game.add.sprite(670,30, 'pill_icon');
        player.loadTexture('spaceshipmini');
        game.world.swap(pillText, pillIcon);
    }

    function updateTimer()
    {
        if(timer === 0)
        {
            pillState = false;
            pillIcon.kill();
            player.loadTexture('spaceship');
            pillText.destroy();
            game.time.events.remove(miniTimer);
            timer = 10;
        }

        timer -= 1;
    }

    function destroyPowerUps()
    {
        powersGroup.forEachAlive(function(m) {
            if(m.body.x < 0)
            {
                m.kill();

                if(x2State)
                    x2Icon.kill();

                if(x4State)
                    x4Icon.kill();

                countx2 = 0;
                x2State = false;
                x4State = false;
            }
        }, this);
    }

    function gameOver()
    {

        game.add.text(120, 70, 'Tu única posibilidad de sobrevivir ha fracasado.', { font: "bold 24px Arial", fill: "white" });
        music.stop();

        if(!ranking)
        {
            showRanking();
            jQuery('.scoreSpan').text('Tu puntuación ha sido de '+score+' puntos.');
            jQuery('#ranking').toggle();
            ranking = true;
        }
    }

    function createMusic()
    {
        music = game.add.audio('music');
        music.loop = true;
    }
};