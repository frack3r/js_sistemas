var detalles_vista="|";

function ver_seccion_principal(operacion,seccion)
    {
        var url="modelos/mod_general.php";
        
        $("#div_logo_img").fadeOut(1000);
        $("#div_logo_img_mini").fadeIn(1500);
        
        $.post(url,{operacion:operacion,seccion:seccion},
        function(data){
            $('#contenido_seccion').html(data);
            if(operacion==='lista' &&  seccion==='consulta_empleados')
            {
                document.getElementById("barra_menu").style.display="none";
            }
        });
}

function ver_seccion_secundaria(operacion,seccion,id)
{
 var url="modelos/mod_general.php";    
        $.post(url,{operacion:operacion,seccion:seccion,id:id},
        function(data){
            $('#contenido_seccion').html(data);
        });    
}

//los formularios enviados con validacion roja se envian en esta funcion
function enviar_form(form)
{
    if(form!=="registro_actuacion"){
        var arreglo_info= form.split("_");
        var operacion=arreglo_info[1];
        var seccion=arreglo_info[2];

        var url="controladores/guardar_"+seccion+".php";
                  $.post(url,$("#"+form).serialize(),
                  function(data){
                      $("#"+form)[0].reset();
                      document.getElementById("alert_"+operacion+"_"+seccion).style.display='block';
                      $("#alert_"+operacion+"_"+seccion).html(data);
                      });
    }
    else if(form==="registro_actuacion")
        {
            var url="controladores/guardar_actuacion.php";   
            
            formulario=document.getElementById("registro_actuacion");
            id_editar=document.getElementById("id_carpeta").value;
            var Data = new FormData(formulario);
	
                if(window.XMLHttpRequest) {
                        var Req = new XMLHttpRequest();
                }else if(window.ActiveXObject) {
                        var Req = new ActiveXObject("Microsoft.XMLHTTP");
                }
                
                Req.open("POST", url, true);
                
                Req.onload = function(Event) 
                {
		if (Req.status === 200) {
                        var st = Req.responseText;
                        if(st.indexOf("Error")!==false){
                                var element = document.getElementById("mensaje");
                                element.innerHTML='<div class="alert alert-success" onclick="this.style.display=\'none\'">Operacion Realizada, '+st+'</div>';
                                $("#registro_actuacion")[0].reset();
                                    var url="./vistas/view_lista_actuaciones.php";    
                                    $.post(url,{id:id_editar},
                                        function(data){
                                            $('#lista_actuaciones').html(data);
                                        });
                                }
                        else{
                                var element = document.getElementById("mensaje");
                                element.innerHTML='<div class="alert alert-danger" onclick="this.style.display=\'none\'>Error: No se ha podido guardar la informacion intentelo nuevamente, si los problemas continuan comuniquese con el administrador del sistema</div>';
                                
                            }
                } 
                else 
                {
		    	console.log(Req.status);
		}
	};	  
                
                Req.send(Data);
                //document.getElementById("procesando_info").style.visibility="hidden";   
                }
}
function pantalla_completa(element)
{
    if(element.className==="glyphicon glyphicon-fullscreen"){
        
    var el = document.documentElement;
       var rfs = // for newer Webkit and Firefox
           el.requestFullScreen
           || el.webkitRequestFullScreen
           || el.mozRequestFullScreen
           || el.msRequestFullScreen
               ;
               if(typeof rfs!=="undefined" && rfs){
                   rfs.call(el);
               } else if(typeof window.ActiveXObject!=="undefined"){
               // for Internet Explorer
               var wscript = new ActiveXObject("WScript.Shell");
               if (wscript!==null) {
                   wscript.SendKeys("{F11}");
               }
               }
               
               element.className="glyphicon glyphicon-resize-small";
           }
           else
           {
           cancelFullScreen(element);    
           }
}
function cancelFullScreen(element) {
     if(document.cancelFullScreen) {
         document.cancelFullScreen();
     } else if(document.mozCancelFullScreen) {
         document.mozCancelFullScreen();
     } else if(document.webkitCancelFullScreen) {
         document.webkitCancelFullScreen();
     }
     element.className="glyphicon glyphicon-fullscreen";
 }

function detalle_empleado(id)
{
    var url="vistas/view_detalle_empleado.php";
                  $.post(url,{id:id},
                  function(data){
                      $("#div_detalle_empleado").html(data);
                      });
}

function detalle_interno(id)
{
    document.getElementById("fondo_cargando").style.display="block";
    document.getElementById("div_cargando").style.display="block";
    var url="vistas/view_detalle_interno.php";
                  $.post(url,{id:id},
                  function(data){
                      $("#div_detalle_interno").html(data);
                      });
    
}
function cerrar_consulta()
{
    document.getElementById('pantalla_completa').style.display='none';
    document.getElementById('pantalla_completa').innerHTML='';
    document.getElementById("barra_menu").style.display="block";
}
function cambiar_imagen(img)
    {
        console.log("cambio"+img);
        document.getElementById("foto_principal").src=document.getElementById("foto_"+img).src;
    }
function detalle_interno_doctos(id)
{
    
    document.getElementById("fondo_cargando").style.display="block";
    document.getElementById("div_cargando").style.display="block";
    var url="vistas/view_detalle_interno_doctos.php";
                  $.post(url,{id:id},
                  function(data){
                      $("#div_detalle_interno_doctos").html(data);
                      });
}
function cerrar_detalle_interno_doctos()
{
    document.getElementById("div_detalle_interno_doctos").style.display="none";
    document.getElementById("div_detalle_interno_doctos").innerHTML("");
}
//ahora
