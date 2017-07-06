const AVION = document.querySelector('.avion');
const CIELO = document.querySelector('.cielo');
const VELOCIDAD = 3;
var tiempo = 0;
var pajaro1 = document.querySelector('.pajaro1');
var pajaro1 = document.querySelector('.pajaro1');
var pajaro2 = document.querySelector('.pajaro2');
var pajaro3 = document.querySelector('.pajaro3');
var pajaro4 = document.querySelector('.pajaro4');
var darkPlane1 = document.querySelector('.dark-plane');

/* ==================================== *
*           MECÁNICAS                   *
* ===================================== */
function aparecer(enemigo) {
	var enemy = document.querySelector('.' + enemigo);
	if (enemy === null) {
		var random = Math.floor((Math.random() * 590) + 70);
    var elemento = '<div class="' + enemigo + '"></div>';
		CIELO.insertAdjacentHTML('afterbegin', elemento);
		enemy = document.querySelector('.' + enemigo);			
		enemy.style.top = random + 'px';
	}
};

// CHEQUEAR COLISION
function colisionaCon(enemigo) {
	if (AVION !== null) {
		var avionY = parseInt(window.getComputedStyle(AVION).top);
	}

	if (enemigo !== null) {
		var enemigoY = parseInt(window.getComputedStyle(enemigo).top);
		var enemigoX = parseInt(window.getComputedStyle(enemigo).left);
	}
	
	if (enemigoX >= 40 && enemigoX <= 150) {
		var diferencia = (avionY - enemigoY);
		if (diferencia >= -45 && diferencia <= 45) {
			return true;		
		}
	}
};

( () => {
  /* ==================================== *
	 *           MOVIMIENTOS                *
	 * ==================================== */
	var seMueve;
	function arriba() {
    var top = parseInt(window.getComputedStyle(AVION).top);
		if (top > 70)  {
			AVION.style.top = (top - VELOCIDAD) + 'px';
			if ( seMueve === true ) {
			  	setTimeout( arriba , 7 );
			}
		}
	};

	function abajo() {
    var top = parseInt(window.getComputedStyle(AVION).top);
		if (top < 600)  {
			AVION.style.top = (top + VELOCIDAD) + 'px';
			if ( seMueve === true ) {
			  	setTimeout( abajo , 7 );
			}
		}
	};

	document.addEventListener('keydown', (event) => {
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

	document.addEventListener('keyup',  () => {
		// Solo aviso que el avion ya no se mueve
		seMueve = false;
	});

  /* ==================================== *
	 *           TEMPORIZADORES             *
	 * ==================================== */

	// TIEMPO TRANSCURRIDO
	setInterval( () => {
    tiempo++;
    var timer = document.querySelector('.tiempo');
		timer.innerHTML = tiempo;
		if (tiempo > 60) {
			timer.style.color = 'blue';
		}
	}, 1000)

  /* 
		Chequea constantemente si el pajaro o el avion oscuro están fuera de la pantalla
		Si es así, lo elimina del DOM 

		También chequear por colisiones
	*/
	setInterval( () => {
		pajaro1 = document.querySelector('.pajaro1');
    pajaro2 = document.querySelector('.pajaro2');
		pajaro3 = document.querySelector('.pajaro3');
		pajaro4 = document.querySelector('.pajaro4');
		darkPlane1 = document.querySelector('.dark-plane');
		
		// CHEQUEAR - FUERA DE PANTALLA
		if (pajaro1 !== null) {
      var left = parseInt(window.getComputedStyle(pajaro1).left);
			if (left <= -50) {
				CIELO.removeChild(pajaro1);
			}
		}
    if (pajaro2 !== null) {
      var left = parseInt(window.getComputedStyle(pajaro2).left);
			if (left <= -50) {
				CIELO.removeChild(pajaro2);
			}
		}
    if (pajaro3 !== null) {
      var left = parseInt(window.getComputedStyle(pajaro3).left);
			if (left <= -50) {
				CIELO.removeChild(pajaro3);
			}
		}
    if (pajaro4 !== null) {
      var left = parseInt(window.getComputedStyle(pajaro4).left);
			if (left <= -50) {
				CIELO.removeChild(pajaro4);
			}
		}
    if (darkPlane1 !== null) {
      var left = parseInt(window.getComputedStyle(darkPlane1).left);
			if (left <= -50) {
				CIELO.removeChild(darkPlane1);
			}
		}

    // CHEQUEAR COLISIÓN - ALERTA
    if (colisionaCon(pajaro1) || colisionaCon(pajaro2) || 
        colisionaCon(pajaro3) || colisionaCon(pajaro4) || colisionaCon(darkPlane1)) {	
      // DETENER TODOS LOS TEMPORIZADORES
      for (var i = 1; i < 99999; i++) {
        window.clearInterval(i);
      }
      // RECARGAR PAGINA
      alert('Has perdido.')
      location.replace('./index.html');
    }
	}, 50);

  // Cada cierto tiempo segundo, crea un pajaro (si no hay ninguno en pantalla)
	setInterval( () => {
		aparecer('pajaro1');
	}, 500);
  setInterval( () => {
		aparecer('pajaro2');
	}, 1000);
	setInterval( () => {
		aparecer('pajaro3');
	}, 2000);
	setInterval( () => {
		aparecer('pajaro4');
	}, 3000);
	// Cada 1 segundo, crea un avion oscuro (si no hay ninguno en pantalla)
	setInterval( () => {
		aparecer('dark-plane');
	}, 10000);
})();