ElRapidoYElMuerto = {
    /* Variable para poder parar/cambiar/arrancar la musica si es necesario */
    music: null,

    /* Podemos saber si la pantalla se ha girado y en ese caso detener el juego */
    orientated: false,

    tirador : {
        bueno: 1,
        feo: 1,
        //tam: 0,
        malo: 1,
        vel: 200,
        vida: 10,
        fama: 1,
        dinero: 0,
        num_tirador:0
    },
    tiradores:[{
            nombre: "El bueno",
            img: "bueno",
            texto: "Rapido como \n" +
                "una serpiente.\n" +
                "El bueno es el\n" +
                "pistolero\n" +
                "mas rapido de todos.\n"+
                "VELOCIDAD:+2\n"+
                "TAM. MIRILLA:+1\n"+
                "TIEMPO:+1\n",
            bueno:2,
            feo: 1,
            malo:1
        },
        {
            nombre: "El feo",
            img: "feo",
            texto: "Tramposo como\n" +
                "un coyote.\n" +
                "El feo es el pistolero\n" +
                "con la mejor punteria.\n"+
                "VELOCIDAD:+1\n"+
                "TAM. MIRILLA:+2\n" +
                "TIEMPO:+1\n",      
            bueno: 1,
            feo: 2,
            malo: 1
        },
        {
            nombre: "El malo",
            img: "malo",
            texto: "Frio como\n" +
                "el hielo.\n" +
                "El malo es el pistolero\n" +
                "que dispone de mas\n" +
                "tiempo para disparar.\n" +
                "VELOCIDAD:+1\n"+
                "TAM. MIRILLA:+1\n" +
                "TIEMPO:+2\n", 
            bueno: 1,
            feo: 1,
            malo: 2
        }
    ],
    enemigo:{
        numEnemigo: 0,
        dificultad:0
    },
    enemigos: [
        {
            nombre: "'Little' Jon Daniels",
            txtHistoria: "Jon es el benjamin\n" +
                "del clan Daniels.\n" +
                "Todo lo que tiene\n" +
                "de chico lo tiene\n" +
                "de mala persona.\n" +
                "No dudara un\n" +
                "instante en matarte.",
            txtMuerte: "Felicidades! Has "+
                "eliminado a un perro\n" +
                "rabioso que tenia " +
                "atemorizada a la\n" +
                "ciudad.\n" +
                "Quizas los hermanos " +
                "Daniels se venguen...",
            txtVida: "'Me quedare con tus "+
                "botas...\n"+
                "Tu ya no las vas a " +
                "necesitar'",
            vida: 10,
            danno: 20,
            dinero: 100,
            fama: 10,
            dificultad: 1,
            img: "Jon"
        },
        {
            nombre: "Jacinto Morales",
            txtHistoria: "Jacinto,de manera\n" +
                "desesperada,apuesta a\n" +
                "que es capaz de\n" +
                "sobrevivir a un duelo\n" +
                "contra ti.\n" +
                "No es buen tirador,\n" +
                "por lo que es poco\n" +
                "probable que\n" +
                "te mate",
            txtMuerte: "Mientras te alejas " +
                "ves a la familia del\n" +
                "pobre Jacinto " +
                "llorando sobre su cuerpo...",
            txtVida: "Jacinto corre a reunirse\n"+
                "con su mujer y 5 crios\n"+
                "que no paran de gritar.\n"+
                "voltea la cabeza para mirarte\n"+
                "antes de irse...",
            vida:10,
            danno:5,
            dinero:1,
            fama:-10,
            dificultad:1,
            img: "Jacinto"
        },
        {
            nombre: "Peter McAllister",
            txtHistoria: "Peter te reta a\n" +
                "un duelo para\n" +
                "demostrarle a la\n" +
                "bella Mary Lou,\n" +
                "que es un vaquero\n" +
                "digno de su amor.\n" +
                "No es mala persona,\n" +
                "pero tiene muy buena\n" +
                "punteria",
            txtMuerte: "'Maldito!' grita la\n" +
                "bella Mary Lou.\n" +
                "'Has matado a un hombre bueno!\n" +
                "Me vengare!'",
            txtVida: "'Mi heroe!'\n"+
                "El grito de alegria\n"+
                "de la bella Mary\n"+
                "es lo ultimo que escuchas",
            vida: 10,
            danno: 10,
            dinero: 10,
            fama: -5,
            dificultad: 2,
            img: "Peter"
        },
        {
            nombre: "Mac 'El Perro' Daniels",
            txtHistoria: "Mac es el pistolero\n"+
                "mas sucio que vas a\n"+
                "encontrar al oeste\n"+
                "del rio Pecos \n" +
                "y el mediano del\n"+
                "Clan Daniels. Viene\n"+
                "a vengar la muerte\n"+
                "de su hermano.",
            txtMuerte: "Otra muesca\n"+
                "en tu revolver\n"+
                "a costa del clan\n"+
                "Daniels.Cuantos\n"+
                "hermanos eran?",
            txtVida: "Mac escupe\n"+
                "a tus pies y se marcha\n"+
                "sin decir palabra\n" +
                "hacia el horizonte",
            vida: 10,
            danno: 20,
            dinero: 100,
            fama: 10,
            dificultad: 4,
            img: "Mac"
        },
    ]
};

ElRapidoYElMuerto.Boot = function (game) {
};

ElRapidoYElMuerto.Boot.prototype = {

    preload: function () {
        /*Leo la barra de información de la carga*/
        this.load.image('preloaderBar', 'assets/pics/preload.png');

    },

    create: function () {

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            /*Datos de escala si el juego se ejecuta en un ordenador*/
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 320;
            this.scale.minHeight = 240;
            this.scale.maxWidth = 640;
            this.scale.maxHeight = 480;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        }
        else
        {
            /*Datos de escala si el juego se ejecuta en un movil*/
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }

        this.state.start('Preloader');

    },

    gameResized: function (width, height) {
    },

    enterIncorrectOrientation: function () {

        ElRapidoYElMuerto.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        ElRapidoYElMuerto.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};
