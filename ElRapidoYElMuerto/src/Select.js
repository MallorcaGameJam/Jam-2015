
ElRapidoYElMuerto.Select = function (game) {
	this.music = null;
	this.btComenzar = null;
	this.bmpPistolero = null;
	this.txtPresentacion = null;
	this.numPistolero = 0;
	this.dataPistolero = null;
};

ElRapidoYElMuerto.Select.prototype = {

	create: function () {
        /*Añado la musica*/
		// this.music = this.add.audio('titleMusic');
		// this.music.play();
        /*Reinicio al pistolero elegido*/

        /*Añado el fondo de pantalla*/
		this.add.sprite(0, 0, 'selectpage');

	    /*Añado un titulo*/
		var txtTitle = this.add.text(this.world.centerX, 80, "SELECCIONA A TU PISTOLERO");
	    //Lo convierto en texto del oeste
		textoOeste(txtTitle, 30, true,true);

	    /*Cargo los botones*/
	    /*Boton de partida nueva*/
	    /*Sprites boton parametros posX, posY,imagen,funcion,Over,Normal,Click*/
		this.btComenzar = this.add.button(this.world.centerX-100, 360, 'button', this.startGame, this, 0, 1, 2);
		this.btComenzar.input.useHandCursor = true;
	    
        /*Cargo el pistolero por defecto*/
		this.dataPistolero = ElRapidoYElMuerto.tiradores[this.numPistolero];

	    /*Cargo la imagen por defecto del pistolero elegido*/
		this.bmpPistolero = this.add.sprite(this.world.centerX + 40, 120, this.dataPistolero.img);
		this.bmpPistolero.inputEnabled = true;
		this.bmpPistolero.events.onInputDown.add(this.cambiarPistolero, this);

        /*Cargo el texto de presentacion del pistolero*/
		this.txtPresentacion = this.add.text(this.world.centerX - 140, 240, this.dataPistolero.nombre +"\n"+ this.dataPistolero.texto);
		textoOeste(this.txtPresentacion, 18);

	    /*Añado los textos de los botones*/
		var txtBtComenzar = this.add.text(this.world.centerX, 400, "SELECCIONAR");
		textoOeste(txtBtComenzar, 18,false,true);
	},

	update: function () {

	},

	cambiarPistolero: function () {
	    this.numPistolero++;
	    if (this.numPistolero > ((ElRapidoYElMuerto.tiradores.length - 1))) {
	        this.numPistolero = 0;
	    }

	    /*Cargo el pistolero nuevo*/
	    this.dataPistolero = ElRapidoYElMuerto.tiradores[this.numPistolero];

	    /*Cargo la imagen por defecto del pistolero elegido*/
	    this.bmpPistolero.loadTexture(this.dataPistolero.img);

	    /*Cargo el texto de presentacion del pistolero*/
	    this.txtPresentacion.text = this.dataPistolero.nombre + "\n" + this.dataPistolero.texto;
	},

	startGame: function (pointer) {

        /*Detengo la musica*/
	    // this.music.stop();
        /*Cargo los datos del pistolero elegido por el usuario*/
	    ElRapidoYElMuerto.tirador.numTirador = this.numPistolero;
	    ElRapidoYElMuerto.tirador.bueno = this.dataPistolero.bueno;
	    ElRapidoYElMuerto.tirador.feo = this.dataPistolero.feo;
	    ElRapidoYElMuerto.tirador.malo = this.dataPistolero.malo;
	    ElRapidoYElMuerto.tirador.fama = 1;
	    ElRapidoYElMuerto.tirador.dinero = 0,
	    /*Inicio el juego*/
		this.state.start('PreDuel');

	},

    render: function (pointer){
        this.game.debug.text("", 32, 32);
    }

};
