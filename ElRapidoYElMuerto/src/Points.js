
ElRapidoYElMuerto.Points = function (game) {

	this.music = null;
	this.button = null;

};

ElRapidoYElMuerto.Points.prototype = {

	create: function () {
        /*Añado la musica*/
		// this.music = this.add.audio('titleMusic');
		// this.music.play();

        /*Añado el fondo de pantalla*/
		this.add.sprite(0, 0, 'howtopage');

        /*Añado un titulo*/
		var txtTitle = this.add.text(this.world.centerX, 80, "Como Jugar");
		txtTitle.anchor.setTo(0.5);
	    //Lo convierto en texto del oeste
		textoOeste(txtTitle, 50, true,true);

	    /*Cargo los botones*/
	    /*Boton de partida nueva*/
	    /*Sprites boton parametros posX, posY,imagen,funcion,Over,Normal,Click*/
		this.btComenzar = this.add.button(this.world.centerX - 100, 360, 'button', this.Menu, this, 0, 1, 2);
		this.btComenzar.input.useHandCursor = true;


	    /*Añado los textos de los botones*/
		var txtBtComenzar = this.add.text(this.world.centerX, 400, "INICIO");
		textoOeste(txtBtComenzar, 18, false, true);

	    /*Añado el texto explicativo*/
		var txtTmp = "El rapido y el muerto es un juego de duelos\n"+
            "1)Elije a tu pistolero pulsando sobre su imagen\n" +
            "2)Conoce la historia de tu contrincante\n" +
            "3)Para comenzar el duelo pulsa\nen el reloj\n" +
            "4)Durante el duelo mueve el raton para\nque la mirilla te siga.Cuando estes listo\npara disparar pulsa el boton del raton.\n"+
            "5)Reclama tus ganancias y tu fama"
		var txtExplicacion = this.add.text(this.world.centerX, this.world.centerY - 20, txtTmp, { align: "left" });
	    //Lo convierto en texto del oeste
		textoOeste(txtExplicacion, 16);
	},

	update: function () {

	},

	Menu: function (pointer) {

        /*Detengo la musica*/
		// this.music.stop();
		/*Inicio el juego*/
		this.state.start('MainMenu');

	},

	verPuntuaciones: function (pointer) {

	    /*Detengo la musica*/
	    // this.music.stop();
	    /*Inicio el juego*/
	    this.state.start('Points');

	},

    render: function (pointer){
        this.game.debug.text("", 32, 32);
    }

};
