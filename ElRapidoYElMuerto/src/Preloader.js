
ElRapidoYElMuerto.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.ready = false;

};

ElRapidoYElMuerto.Preloader.prototype = {

	preload: function () {
        /*Mostramos una barra de carga*/
	    this.preloadBar = this.add.sprite(120, 200, 'preloaderBar');
	    this.load.setPreloadSprite(this.preloadBar);

	    /*Cargamos todas las imagenes*/
		this.load.image('titlepage', 'assets/pics/titlepage.png');
		this.load.image('selectpage', 'assets/pics/selectpage.png');
		this.load.image('deadpage', 'assets/pics/deadpage.png');
		this.load.image('winpage', 'assets/pics/winpage.png');
		this.load.image('howtopage', 'assets/pics/howtopage.png');
		this.load.image('duelpage', 'assets/pics/duelpage.png');
		this.load.image('mirilla', 'assets/pics/mirilla.png');
		this.load.image('bueno', 'assets/pics/bueno.png');
		this.load.image('feo', 'assets/pics/feo.png');
		this.load.image('malo', 'assets/pics/malo.png');
		this.load.image('Jon', 'assets/pics/Jon.png');
		this.load.image('Jacinto', 'assets/pics/Jacinto.png');
		this.load.image('Peter', 'assets/pics/Peter.png');
		this.load.image('Mac', 'assets/pics/Mac.png');
		this.load.image('reloj', 'assets/buttons/reloj.png');

	    /*Cargamos todos los sprites*/
		this.load.spritesheet('enemigo', 'assets/sprites/enemigo.png', 64, 64);
		this.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);

	    /*Cargamos todos los scripts*/
		//this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

	    /*Cargamos los sonidos*/
		this.load.audio('disparo', 'assets/audio/shoot.ogg');
		this.load.audio('disparofallado', 'assets/audio/shoot_fail.ogg');
		this.load.audio('cajamusica', 'assets/audio/music_box.ogg');

	},

	create: function () {

		this.preloadBar.cropEnabled = false;

		this.state.start('MainMenu');

	},

	update: function () {

		// if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		// {
			// this.ready = true;
			// this.state.start('MainMenu');
		// }

	}

};
