
 // =====================================================
 // GRAN FORJADOR
 // JAVASCRIPT PRINCIPAL
 // =====================================================


 // =====================================================
 // 1. VERIFICACION DE EDAD
 // =====================================================

function verifyAge(isAdult) {

    const ageScreen = document.getElementById("age-screen");

    if (!ageScreen) return;

    if (isAdult) {

        localStorage.setItem("granForjadorAge", "verified");

        ageScreen.style.display = "none";

    } else {

        const ageBox = document.querySelector(".age-box");

        ageBox.innerHTML = `
            <h2>GRAN FORJADOR</h2>

            <p>
                Lo sentimos, debes ser mayor de 18 años para ingresar.
            </p>

            <p>
                El consumo de alcohol es perjudicial para la salud.
            </p>
        `;

    }

}


// =====================================================
// 2. COMPROBAR SI LA EDAD YA FUE VERIFICADA
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const ageScreen = document.getElementById("age-screen");

    if (
        ageScreen &&
        localStorage.getItem("granForjadorAge") === "verified"
    ) {

        ageScreen.style.display = "none";

    }

});


// =====================================================
// 3. SELECCION DE SABORES
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const sabores = document.querySelectorAll(".flavor");

    const panel = document.getElementById("flavor-detail");

    const titulo = document.getElementById("flavor-detail-title");

    const descripcion = document.getElementById("flavor-detail-text");


    // Comprobar que existen los elementos

    if (!panel || !titulo || !descripcion || sabores.length === 0) {

        return;

    }


    // Seleccionar sabor

    function seleccionarSabor(sabor) {

        // Desactivar todas las tarjetas

        sabores.forEach(function (otroSabor) {

            otroSabor.classList.remove("seleccionado");

            otroSabor.setAttribute("aria-pressed", "false");

        });


        // Activar tarjeta seleccionada

        sabor.classList.add("seleccionado");

        sabor.setAttribute("aria-pressed", "true");


        // Obtener informacion del sabor

        const nombre = sabor.dataset.name;

        const texto = sabor.dataset.description;


        // Actualizar panel horizontal

        titulo.textContent = nombre;

        descripcion.textContent = texto;


        // Mostrar panel

        panel.classList.add("visible");

    }


    // Eventos de cada tarjeta

    sabores.forEach(function (sabor) {

        // Clic del mouse

        sabor.addEventListener("click", function () {

            seleccionarSabor(sabor);

        });


        // Teclado

        sabor.addEventListener("keydown", function (evento) {

            if (evento.key === "Enter" || evento.key === " ") {

                evento.preventDefault();

                seleccionarSabor(sabor);

            }

        });

    });

});


// =====================================================
// 4. SECCIONES DESPLEGABLES
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const botones = document.querySelectorAll(".accordion-toggle");


    botones.forEach(function (boton) {

        boton.addEventListener("click", function () {

            // Identificar la sección

            const seccion = boton.closest(".accordion-section");

            const panelId = boton.getAttribute("aria-controls");

            const panel = document.getElementById(panelId);


            // Comprobar elementos

            if (!seccion || !panel) {

                return;

            }


            // Abrir o cerrar únicamente esta sección

            const estaAbierta = seccion.classList.toggle("is-open");


            // Actualizar accesibilidad

            boton.setAttribute(
                "aria-expanded",
                String(estaAbierta)
            );

            panel.setAttribute(
                "aria-hidden",
                String(!estaAbierta)
            );

            panel.inert = !estaAbierta;

        });

    });

});

/* =====================================================
   ABRIR SABORES DESDE EL BOTÓN DEL INICIO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const botonSabores = document.querySelector(
        '.hero-content a[href="#sabores"]'
    );

    const seccionSabores = document.getElementById("sabores");

    if (!botonSabores || !seccionSabores) return;

    botonSabores.addEventListener("click", function (evento) {

        evento.preventDefault();

        const botonDesplegable = seccionSabores.querySelector(
            ".accordion-toggle"
        );

        const panel = document.getElementById("sabores-panel");

        if (!botonDesplegable || !panel) return;

        // Abrir la sección si está cerrada
        if (botonDesplegable.getAttribute("aria-expanded") !== "true") {
            botonDesplegable.click();
        }

        // Bajar hasta la sección de sabores
        setTimeout(function () {
            seccionSabores.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 150);

    });

});
// =====================================================
// GRAN FORJADOR - 5 RITMOS DE LUZ
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const logo = document.getElementById("logo-forjador");

    if (!logo) return;

    const ritmos = [
        "Brasa",
        "Latido",
        "Llama",
        "Forja",
        "Explosion dorada"
    ];

    let ritmoActual = 0;

    function cambiarRitmo() {

        ritmoActual = (ritmoActual + 1) % ritmos.length;

        logo.setAttribute("data-light-mode", ritmoActual);

        console.log("Ritmo de luz:", ritmos[ritmoActual]);
    }

    logo.addEventListener("click", cambiarRitmo);

    logo.addEventListener("keydown", function (evento) {

        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            cambiarRitmo();
        }

    });

});
// =====================================================
// NAVEGACION INTELIGENTE DEL MENU
// GRAN FORJADOR
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const enlacesMenu = document.querySelectorAll("header nav a");

    enlacesMenu.forEach(function (enlace) {

        enlace.addEventListener("click", function (evento) {

            const destino = enlace.getAttribute("href");

            // INICIO
            if (destino === "#inicio") {

                evento.preventDefault();

                document.getElementById("inicio").scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

            // SABORES, HISTORIA Y ESENCIA
            const secciones = {
                "#sabores": "sabores-panel",
                "#historia": "historia-panel",
                "#esencia": "esencia-panel"
            };

            if (secciones[destino]) {

                evento.preventDefault();

                const panel = document.getElementById(secciones[destino]);

                if (!panel) return;

                const boton = document.querySelector(
                    '[aria-controls="' + secciones[destino] + '"]'
                );

                if (!boton) return;

                // Abrir solamente si está cerrado
                if (boton.getAttribute("aria-expanded") !== "true") {
                    boton.click();
                }

                const seccion = document.querySelector(destino);

                setTimeout(function () {
                    seccion.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 180);

            }

            // CONTACTO
            if (destino === "#contacto") {

                evento.preventDefault();

                document.getElementById("contacto").scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});