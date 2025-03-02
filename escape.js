let estadoDelJuego = {
    jugador: {
      salud: 100,
      posicion: "sala de máquinas",
      armas: [],
      decisiones: [],
    },
    alien: {
      cerca: false,
      enRastro: true,
    },
    nave: {},
  };
  
  // Variable para determinar aleatoriamente dónde aparece el hangar
  let hangarUbicacion = null;
  function determinarHangar() {
    const opciones = ["sala de control", "sala de armas", "puesto médico"];
    hangarUbicacion = opciones[Math.floor(Math.random() * opciones.length)];
  }
  
  // Función para actualizar el estado del juego en la página
  function actualizarEstado() {
    const estadoElemento = document.getElementById('estadoJuego');
    estadoElemento.textContent = `Salud: ${estadoDelJuego.jugador.salud} | Posición: ${estadoDelJuego.jugador.posicion} | Armas: ${estadoDelJuego.jugador.armas.join(', ') || 'Ninguna'}`;
  }
  
  // Función para actualizar la narrativa y opciones en la página
  function actualizarNarrativa(mensaje, mostrarOpciones = true) {
    const narrativaElemento = document.getElementById('narrativa');
    const opcionesElemento = document.getElementById('opciones');
    narrativaElemento.textContent = mensaje;
  
    if (mostrarOpciones && estadoDelJuego.jugador.salud > 0) {
      if (estadoDelJuego.jugador.posicion === "sala de máquinas") {
        opcionesElemento.innerHTML = `
          <button onclick="tomarDecision('A')">Ir a pasillo principal</button>
        `;
      } else if (estadoDelJuego.jugador.posicion === "pasillo principal") {
        opcionesElemento.innerHTML = `
          <button onclick="tomarDecision('B')">Ir a sala de control</button>
          <button onclick="tomarDecision('C')">Ir a sala de armas</button>
          <button onclick="tomarDecision('E')">Volver a sala de máquinas</button>
          <button onclick="tomarDecision('F')">Ir a puesto médico</button>
        `;
      } else if (estadoDelJuego.jugador.posicion === "sala de control") {
        let opciones = `<button onclick="tomarDecision('A')">Volver al pasillo principal</button>`;
        if (hangarUbicacion === "sala de control") {
          opciones += `<button onclick="tomarDecision('D')">Ir al hangar</button>`;
        }
        opcionesElemento.innerHTML = opciones;
      } else if (estadoDelJuego.jugador.posicion === "sala de armas") {
        let opciones = `<button onclick="tomarDecision('A')">Volver al pasillo principal</button>`;
        if (hangarUbicacion === "sala de armas") {
          opciones += `<button onclick="tomarDecision('D')">Ir al hangar</button>`;
        }
        opcionesElemento.innerHTML = opciones;
      } else if (estadoDelJuego.jugador.posicion === "puesto médico") {
        let opciones = `<button onclick="tomarDecision('A')">Volver al pasillo principal</button>`;
        if (hangarUbicacion === "puesto médico") {
          opciones += `<button onclick="tomarDecision('D')">Ir al hangar</button>`;
        }
        opcionesElemento.innerHTML = opciones;
      } else if (estadoDelJuego.jugador.posicion === "hangar") {
        opcionesElemento.innerHTML = `
          <button onclick="tomarDecision('G')">Ir a nave de escape</button>
        `;
      } else if (estadoDelJuego.jugador.posicion === "nave de escape") {
        opcionesElemento.innerHTML = ''; // Sin opciones al ganar
      }
    } else {
      opcionesElemento.innerHTML = ''; // Limpiar opciones si no se deben mostrar
    }
  }
  
  // Función para que el jugador tome una decisión
  function tomarDecision(opcion) {
    if (estadoDelJuego.jugador.salud <= 0) {
      actualizarNarrativa("Tu salud ha llegado a 0. ¡Game Over!", false);
      return;
    }
  
    if (opcion === "A" && estadoDelJuego.jugador.posicion === "sala de máquinas") {
      estadoDelJuego.jugador.posicion = "pasillo principal";
      estadoDelJuego.jugador.decisiones.push("Fue al pasillo principal");
      if (Math.random() < 0.5) {
        estadoDelJuego.alien.cerca = true;
        actualizarNarrativa("Llegaste al pasillo principal, pero un ruido extraño suena cerca. El alien está aquí. ¿Qué haces?", false);
        mostrarOpcionesCombate();
      } else {
        actualizarNarrativa("Llegaste al pasillo principal. Las luces parpadean y el silencio es inquietante.");
      }
    } else if (opcion === "A" && (estadoDelJuego.jugador.posicion === "sala de control" || estadoDelJuego.jugador.posicion === "sala de armas" || estadoDelJuego.jugador.posicion === "puesto médico")) {
      estadoDelJuego.jugador.posicion = "pasillo principal";
      estadoDelJuego.jugador.decisiones.push("Volvió al pasillo principal");
      if (Math.random() < 0.5) {
        estadoDelJuego.alien.cerca = true;
        actualizarNarrativa("Regresaste al pasillo principal, pero un ruido extraño suena cerca. El alien está aquí. ¿Qué haces?", false);
        mostrarOpcionesCombate();
      } else {
        actualizarNarrativa("Regresaste al pasillo principal. ¿Hacia dónde sigues?");
      }
    } else if (opcion === "B" && estadoDelJuego.jugador.posicion === "pasillo principal") {
      estadoDelJuego.jugador.posicion = "sala de control";
      estadoDelJuego.jugador.decisiones.push("Fue a la sala de control");
      if (Math.random() < 0.5) {
        estadoDelJuego.alien.cerca = true;
        actualizarNarrativa("Llegaste a la sala de control, pero escuchas un ruido extraño cerca. El alien está cerca. ¿Qué haces?", false);
        mostrarOpcionesCombate();
      } else {
        actualizarNarrativa("Llegaste a la sala de control. Todo parece estar en calma, por ahora.");
      }
    } else if (opcion === "C" && estadoDelJuego.jugador.posicion === "pasillo principal") {
      estadoDelJuego.jugador.posicion = "sala de armas";
      estadoDelJuego.jugador.decisiones.push("Fue a la sala de armas");
      if (Math.random() < 0.5) {
        estadoDelJuego.alien.cerca = true;
        actualizarNarrativa("Llegaste a la sala de armas, pero un gruñido resuena detrás de ti. El alien está cerca. ¿Qué haces?", false);
        mostrarOpcionesCombate();
      } else if (Math.random() < 0.5) {
        estadoDelJuego.jugador.armas.push("pistola de plasma");
        actualizarNarrativa("Encontraste una pistola de plasma en la sala de armas.");
      } else {
        actualizarNarrativa("Llegaste a la sala de armas, pero está vacía.");
      }
    } else if (opcion === "D" && (estadoDelJuego.jugador.posicion === "sala de control" || estadoDelJuego.jugador.posicion === "sala de armas" || estadoDelJuego.jugador.posicion === "puesto médico")) {
      estadoDelJuego.jugador.posicion = "hangar";
      estadoDelJuego.jugador.decisiones.push("Fue al hangar");
      if (Math.random() < 0.5) {
        estadoDelJuego.alien.cerca = true;
        actualizarNarrativa("Llegaste al hangar, pero un rugido resuena en la oscuridad. El alien está cerca. ¿Qué haces?", false);
        mostrarOpcionesCombate();
      } else {
        actualizarNarrativa("Llegaste al hangar. La nave de escape está a pocos pasos.");
      }
    } else if (opcion === "E" && estadoDelJuego.jugador.posicion === "pasillo principal") {
      estadoDelJuego.jugador.posicion = "sala de máquinas";
      estadoDelJuego.jugador.decisiones.push("Volvió a la sala de máquinas");
      if (Math.random() < 0.5) {
        estadoDelJuego.alien.cerca = true;
        actualizarNarrativa("Regresaste a la sala de máquinas, pero algo se mueve en las sombras. El alien está cerca. ¿Qué haces?", false);
        mostrarOpcionesCombate();
      } else {
        actualizarNarrativa("Regresaste a la sala de máquinas. El lugar sigue en caos.");
      }
    } else if (opcion === "F" && estadoDelJuego.jugador.posicion === "pasillo principal") {
      estadoDelJuego.jugador.posicion = "puesto médico";
      estadoDelJuego.jugador.decisiones.push("Fue al puesto médico");
      if (Math.random() < 0.2) { // 20% de probabilidad de que el alien aparezca
        estadoDelJuego.alien.cerca = true;
        actualizarNarrativa("Llegaste al puesto médico, pero un sonido viscoso te alerta. El alien está cerca. ¿Qué haces?", false);
        mostrarOpcionesCombate();
      } else if (Math.random() < 0.5 && estadoDelJuego.jugador.salud < 100) { // 50% de curarte al 100%
        estadoDelJuego.jugador.salud = 100;
        actualizarNarrativa("En el puesto médico hay un olor nauseabundo, pero encuentras suministros médicos y te curas completamente.");
      } else {
        actualizarNarrativa("En el puesto médico hay un olor nauseabundo, los cuerpos están en las camillas y el médico descuartizado.");
      }
    } else if (opcion === "G" && estadoDelJuego.jugador.posicion === "hangar") {
      estadoDelJuego.jugador.posicion = "nave de escape";
      estadoDelJuego.jugador.decisiones.push("Fue a la nave de escape");
      actualizarNarrativa("¡Llegaste a la Misión Kalcha y lograste escapar! ¡HAS GANADO!");
    }
    actualizarEstado();
  }
  
  // Función para mostrar opciones de combate
  function mostrarOpcionesCombate() {
    const opcionesElemento = document.getElementById('opciones');
    opcionesElemento.innerHTML = `
      <button onclick="luchar(true)">Luchar</button>
      <button onclick="luchar(false)">Huir</button>
    `;
  }
  
  // Función para manejar la decisión de luchar o huir
  function luchar(decision) {
    if (estadoDelJuego.alien.cerca) {
      if (decision) {
        if (estadoDelJuego.jugador.armas.length > 0) {
          // 50% de probabilidad de éxito con armas
          if (Math.random() < 0.5) {
            actualizarNarrativa("Disparas al alien con tu " + estadoDelJuego.jugador.armas[0] + ". ¡Lo hieres y huye!");
            estadoDelJuego.alien.cerca = false;
            estadoDelJuego.alien.enRastro = false;
          } else {
            estadoDelJuego.jugador.salud -= 40;
            actualizarNarrativa("Disparas al alien, pero fallas. ¡Te ataca y pierdes 40 de salud!");
          }
        } else {
          // 0% de probabilidad sin armas
          estadoDelJuego.jugador.salud -= 100;
          actualizarNarrativa("Intentas enfrentarte al alien sin armas, es inútil, el terror y tu sangre brotan de forma imparable. Mueres.");
        }
      } else {
        estadoDelJuego.jugador.salud -= 20;
        actualizarNarrativa("Decides no luchar y corres, pero el alien te alcanza y te hiere. Pierdes 20 de salud.");
      }
    }
  
    actualizarEstado();
    if (estadoDelJuego.jugador.salud <= 0) {
      actualizarNarrativa("Tu salud ha llegado a 0. ¡Game Over!", false);
    } else {
      actualizarNarrativa("La alarma sigue sonando. ¿Qué haces?");
    }
  }
  
  // Determinar la ubicación del hangar al inicio del juego
  determinarHangar();
  // Inicializar estado al cargar la página
  actualizarEstado();