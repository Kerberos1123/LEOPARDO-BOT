
//Con el bot de "Wall" como inspiracion decidi que el clon al tener poca vida y no podía usar la función "disappear" pensé que funcionaría mejor como señuelo, ya que al seguir la misma ruta que el original
//terminaba atrayendo los ataques hacia él.

//La estrategia del bot/tanque "LEOPARDO" es que mientras el clon distrae al enemigo, el original se posiciona y da vueltas por el borde de la arena, siempre mirando hacia el centro asi tiene
//mas posibilidades de ver al enemigo.



var Robot = function(LEOPARDO) { //Constructor

  LEOPARDO.rotateCannon(90);  //Rotacion inicial para buscar enemigos

};

var AUX = 0; //Variable global que cuenta un número de ciclos de idles
Robot.prototype.onIdle = function(ev) {

  var LEOPARDO = ev.robot;

  LEOPARDO.clone();   //Crea clon

  if (LEOPARDO.parentId !== null) { //Diferencia al clon y le da instrucciones especificas

    LEOPARDO.ahead(12); // Movimiento incial que busca distraer a enemigos
    LEOPARDO.turn(-45);

    AUX += 1; // Incrementa el contador de idles

    if (AUX == 4) { //cada 4 ciclos de idling avanza para salir de la zona de fuego

      LEOPARDO.ahead(130);
      AUX = 0; //Reseteo de contador

    }
  }

  LEOPARDO.ahead(999);  //Si no es el clon avanza 

};
 
Robot.prototype.onScannedRobot = function(ev) {
  var LEOPARDO = ev.robot;

  var enemy = ev.scannedRobot; // Referencia al robot escaneado.

  if(enemy.id !== LEOPARDO.parentId && enemy.parentId !== LEOPARDO.id) { // Si el enemigo no es el robot original ni su clon 

    LEOPARDO.fire();

    if (ev.robot.parentId !== null) { //Para el clon, comportamiento para funcionar de señuelo

	    LEOPARDO.fire();
      LEOPARDO.fire();
      LEOPARDO.rotateCannon(35);
      LEOPARDO.fire();
      LEOPARDO.fire();

    }
    else { // Si no es clon

      LEOPARDO.rotateCannon(-20);
      LEOPARDO.fire();
      LEOPARDO.fire();
      LEOPARDO.rotateCannon(20);
      LEOPARDO.fire();
      LEOPARDO.fire();

    }
  }  
};

Robot.prototype.onHitByBullet = function(ev) {

  var LEOPARDO = ev.robot;
  LEOPARDO.disappear();

  if (LEOPARDO.parentId !== null) {   

    LEOPARDO.stop();
    LEOPARDO.rotateCannon(ev.bearing);
    LEOPARDO.fire();
    LEOPARDO.turn(90 - ev.bulletBearing); // Gira 90 grados menos la dirección de la bala.

  }

  else LEOPARDO.turn(90 - (ev.bulletBearing*2));// Gira ajustando el ángulo en función de la dirección de la bala.
};
 
Robot.prototype.onRobotCollision = function(ev) {

  var LEOPARDO = ev.robot;

  LEOPARDO.back(99); 
  LEOPARDO.turn(90);

};

Robot.prototype.onWallCollision = function(ev) {

  var LEOPARDO = ev.robot;

	if (LEOPARDO.parentId == null) { //Si no es clon

  	LEOPARDO.turn(ev.bearing + 90);  // Gira al ángulo del impacto + 90 grados, con esto una vez toca pared se encarga de ir abrazado a las paredes
  }
  else { //Si es clon

    LEOPARDO.back(100);
    LEOPARDO.rotateCannon(-180); 
    LEOPARDO.turn(ev.bearing - 110);  //Gira al ángulo del impacto - 110 grados

  }

};
 

 
