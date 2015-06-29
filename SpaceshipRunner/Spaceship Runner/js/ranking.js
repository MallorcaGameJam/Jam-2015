var alreadyPosted = false;

function showRanking()
{
	var formData = {mode:'showRanking'};

    $.ajax({
        url : "http://www.adrig.es/mallorcagame/ajax/ajaxHandler.php",
        type: "POST",
        data : formData,
        success: function(data, textStatus, jqXHR)
        {
                printResults(data);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    });
}

function submitRanking()
{
    if(jQuery('#nombre').val() != '')
    {
        if(alreadyPosted == false)
        {
        	mode = 'insertRanking';
            nombre = jQuery('#nombre').val();
            var formData = {name:nombre,score:score,secret:secret,mode:mode};
         
            $.ajax({
                url : "http://www.adrig.es/mallorcagame/ajax/ajaxHandler.php",
                type: "POST",
                data : formData,
                success: function(data, textStatus, jqXHR)
                {
                    if(data == 'FALSE')
                    {
                        alert('Disculpa. Ha habido un error enviado la petición.');
                    }
                    else
                    {                       
                        printResults(data);

                        alreadyPosted = true;
                        $('.divScore').hide();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                }
            });
        }
        else
            alert('Disculpa, ha habido un error con la petición');
    }
    else
        alert('No puedes entrar en el ranking sin nombre.');
}

function printResults(data)
{
    arrayObj = jQuery.parseJSON(data);

    $("#tableScore tr").remove();
    
    $("#tableScore")[0].innerHTML = '<tr><th>Puesto</th><th>Nombre</th><th>Puntuación</th><th>Fecha</th>';

    $.each(arrayObj, function(index, value) {
         $("#tableScore")[0].innerHTML = $("#tableScore")[0].innerHTML +'<tr><td>'+index+'</td><td>'+value.name+'</td><td style="text-align:center;">'+value.score+'</td><td>'+value.datetime+'</td></tr>';
    });
}

function reiniciar()
{
    location.reload();
}

function toggleSound()
{
    sound = jQuery('.valueSound')

    if(sound.val() == 'true')
    {
        $('#imgSound').attr("src", 'assets/icons/sound_disabled.png');
        sound.val('false');
        music.pause();
    }
    else
    {
        sound.val('true');
        $('#imgSound').attr("src", 'assets/icons/Circular_auriculars_64.png');
        music.play();
    }
}