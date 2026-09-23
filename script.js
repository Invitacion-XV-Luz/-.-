const listaFotos = [
    "fotos/foto1.jpeg",
    "fotos/foto2.jpeg",
    "fotos/foto3.jpeg",
    "fotos/foto4.jpeg",
    "fotos/foto5.jpeg",
    "fotos/foto6.jpeg",
    "fotos/foto7.jpeg",
    "fotos/foto8.jpeg",
    "fotos/foto9.jpeg",
    "fotos/foto10.jpeg",
    "fotos/foto11.jpeg",
    "fotos/foto12.jpeg"
];

let indiceActual = 0;
let temporizadorLibro = null;

// ABRIR PORTADA Y MÚSICA
function abrirInvitacion() {
    let portada = document.querySelector(".portada");
    let musica = document.getElementById("musica");
    
    if (musica) {
        musica.play().catch(e => console.log("Reproducción automática bloqueada por el navegador"));
    }
    
    if (portada) {
        portada.classList.add("oculta");
    }
}

// RENDERIZAR LAS FOTOS EN LAS DOS PÁGINAS DEL LIBRO
function renderizarPaginas() {
    const izq = document.getElementById("foto-izquierda");
    const der = document.getElementById("foto-derecha");

    if (!izq || !der) return;

    // Foto Página Izquierda (Página Impar)
    if (listaFotos[indiceActual]) {
        izq.innerHTML = `
            <div class="marco-foto">
                <img src="${listaFotos[indiceActual]}" onclick="verFoto('${listaFotos[indiceActual]}')" alt="Recuerdo">
            </div>`;
    } else {
        izq.innerHTML = "";
    }

    // Foto Página Derecha (Página Par)
    if (listaFotos[indiceActual + 1]) {
        der.innerHTML = `
            <div class="marco-foto">
                <img src="${listaFotos[indiceActual + 1]}" onclick="verFoto('${listaFotos[indiceActual + 1]}')" alt="Recuerdo">
            </div>`;
    } else {
        der.innerHTML = "";
    }
}

// AVANZAR PÁGINA CON ANIMACIÓN 3D CADA 2 SEGUNDOS
function autoAvanzarLibro() {
    const libro = document.querySelector(".libro-abierto");
    if (!libro) return;

    // Reinicia la clase CSS para re-disparar la animación 3D
    libro.classList.remove("animar-flip");
    void libro.offsetWidth; // Forzar reflow en el DOM
    libro.classList.add("animar-flip");

    // Cambia el contenido de la imagen a mitad del giro 3D (350 ms)
    setTimeout(() => {
        indiceActual += 2;
        if (indiceActual >= listaFotos.length) {
            indiceActual = 0;
        }
        renderizarPaginas();
    }, 350);
}

// ABRIR / CERRAR ÁLBUM Y CONTROLAR EL TIMER DE 2 SEGUNDOS
function abrirAlbum() {
    let album = document.getElementById("album");

    if (album.style.display === "block") {
        album.style.display = "none";
        detenerTemporizador();
    } else {
        album.style.display = "block";
        renderizarPaginas();
        iniciarTemporizador();
    }
}

function iniciarTemporizador() {
    if (!temporizadorLibro) {
        // Pasa las páginas automáticamente cada 2 segundos (2000 ms)
        temporizadorLibro = setInterval(autoAvanzarLibro, 2000);
    }
}

function detenerTemporizador() {
    if (temporizadorLibro) {
        clearInterval(temporizadorLibro);
        temporizadorLibro = null;
    }
}

// VER FOTO EN TAMAÑO COMPLETO (INTERACTIVO)
function verFoto(rutaImagen) {
    let visor = document.getElementById("visor");
    let fotoGrande = document.getElementById("fotoGrande");
    
    // Pausa el paso de páginas mientras el usuario mira la foto
    detenerTemporizador();

    fotoGrande.src = rutaImagen;
    visor.style.display = "flex";
}

// CERRAR FOTO AMPLIADA Y REANUDAR PASO AUTOMÁTICO
function cerrarFoto() {
    document.getElementById("visor").style.display = "none";
    // Reanuda el carrusel de páginas
    iniciarTemporizador();
}

// COPIAR ALIAS AL PORTAPAPELES
function copiarAlias() {
    let alias = document.getElementById("aliasTexto").innerText;
    navigator.clipboard.writeText(alias);
    alert("Alias copiado al portapapeles ✦");
}

// CONTADOR REGRESIVO A LA FECHA DEL EVENTO
const fechaEvento = new Date("November 7, 2026 21:00:00").getTime();

setInterval(function () {
    let ahora = new Date().getTime();
    let distancia = fechaEvento - ahora;

    if (distancia > 0) {
        let dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        let horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        document.getElementById("dias").innerHTML = dias;
        document.getElementById("horas").innerHTML = horas;
        document.getElementById("minutos").innerHTML = minutos;
        document.getElementById("segundos").innerHTML = segundos;
    }
}, 1000);