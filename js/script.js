// var conVida = true;
const AVION = $('.avion');
const VELOCIDAD = 3;
var pajaro1 = $('.pajaro1');
var pajaro2 = $('.pajaro2');
var pajaro3 = $('.pajaro3');
var pajaro4 = $('.pajaro4');
var darkPlane1 = $('.dark-plane');

/* ==================================== *
*           ENEMIGOS                   *
* ==================================== */
function aparecer(enemigo) {
	var enemy = $('.' + enemigo);
	if (enemy.length === 0) {
		var random = Math.floor((Math.random() * 590) + 30);
		$('.cielo').append('<div class="' + enemigo + '"></div>');
		enemy = $('.' + enemigo);			
		enemy.css({top: random});
	}
}

// CHEQUEAR COLISION
function colisionaCon(enemigo) {
	if (AVION.position() !== undefined) {
		var avionY = AVION.position().top;	
	}

	if (enemigo.position() !== undefined) {
		var enemigoY = enemigo.position().top;
		var enemigoX = enemigo.position().left;
	}
	
	if (enemigoX >= 40 && enemigoX <= 150) {
		var diferencia = (avionY - enemigoY);
		if (diferencia >= -45 && diferencia <= 45) {
			return true;		
		}
	}

}

// ELIMINAR TODOS LOS ENEMIGOS, SI PIERDE
function eliminarEnemigos() {
	pajaro1.remove();
	pajaro2.remove();
	pajaro3.remove();
	pajaro4.remove();
	darkPlane1.remove();
}

// DETENER TODOS LOS TEMPORIZADORES
function detenerIntervals() {
	for (var i = 1; i < 99999; i++)
			window.clearInterval(i);
}

$(document).ready( function() {

	/* ==================================== *
	 *           MOVIMIENTOS                *
	 * ==================================== */
	var seMueve;
	function arriba() {
		if (AVION.position().top > 30)  {
			AVION.css('top', '-=' + VELOCIDAD);
			if ( seMueve === true ) {
			  	setTimeout( arriba , 7 );
			}
		}
	}

	function abajo() {
		if (AVION.position().top < 600)  {
			AVION.css('top', '+=' + VELOCIDAD);
			if ( seMueve === true ) {
			  	setTimeout( abajo , 7 );
			}
		}
	}

	$(document).keydown( function(event) {
		// ARRIBA
		if ((event.which === 38 || event.which === 87) && seMueve !== true) {
			seMueve = true;
			arriba()
		}	
		// // ABAJO
		if ((event.which === 40 || event.which === 83) && seMueve !== true) {
			seMueve = true;
			abajo()
		}	
	});

	$(document).keyup(function() {
		// Solo aviso que el avion ya no se mueve
		seMueve = false;
	})

	/* ==================================== *
	 *           TEMPORIZADORES             *
	 * ==================================== */

	/* 
		Chequea constantemente si el pajaro o el avion oscuro están fuera de la pantalla
		Si es así, lo elimina del DOM 
	*/
	setInterval(function() {
		pajaro1 = $('.pajaro1');
		pajaro2 = $('.pajaro2');
		pajaro3 = $('.pajaro3');
		pajaro4 = $('.pajaro4');
		darkPlane1 = $('.dark-plane');
		
		// CHEQUEAR - FUERA DE PANTALLA
		if (pajaro1.position() !== undefined){
			if (pajaro1.position().left <= -50) {
				console.log('-1')
				pajaro1.remove();
			}
		}

		if (pajaro2.position() !== undefined) {
			if (pajaro2.position().left <= -50) {
				console.log('-2')
				pajaro2.remove();
			}
		}

		if (pajaro3.position() !== undefined) {
			if (pajaro3.position().left <= -50) {

				console.log('-3')
				pajaro3.remove();
			}
		}

		if (pajaro4.position() !== undefined) {
			if (pajaro4.position().left <= -50) {
				console.log('-4')
				pajaro4.remove();
			}
		}

		if (darkPlane1.position() !== undefined) {
			if (darkPlane1.position().left <= -50) {
				console.log('-avion')
				darkPlane1.remove();
			}
		}

		if (colisionaCon(pajaro1) || colisionaCon(pajaro2) || 
		    colisionaCon(pajaro3) || colisionaCon(pajaro4) || colisionaCon(darkPlane1)) {
			$("#perdiste").modal('show');		
			detenerIntervals();
			eliminarEnemigos();
			alert('PERDISTE')
			location.reload();			
		}
	}, 50)

	// Cada cierto tiempo segundo, crea un pajaro (si no hay ninguno en pantalla)
	setInterval(function() {
		aparecer('pajaro1');
	}, 500)
	setInterval(function() {
		aparecer('pajaro2');
	}, 1000)
	setInterval(function() {
		aparecer('pajaro3');
	}, 2000)
	setInterval(function() {
		aparecer('pajaro4');
	}, 3000)
	
	// Cada 1 segundo, crea un avion oscuro (si no hay ninguno en pantalla)
	setInterval(function() {
		aparecer('dark-plane');
	}, 10000)

})