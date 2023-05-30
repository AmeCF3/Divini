var selectNav = document.querySelectorAll(".link_nav");
let video = document.getElementById("video")
var form = document.getElementById("form")
let bodegas = document.getElementById("info-cellers")
let vinosContainer = document.getElementById("vinos-container")
let allWines = document.getElementById("allWines")
let cardsShop = document.getElementsByClassName("card-container-general1")

var buttonNav = [];
let dataVinos = [];

// LLAMADO A LA API
const coleccionVinos = firebase.firestore().collection("BBDD");

coleccionVinos.get()
    .then((results) => {
        const data = results.docs
            .filter((doc) => doc.data().Category === "vinos")
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        dataVinos.push(...data);
    })
    .catch((error) => {
        console.error("Error al obtener los datos:", error);
    });

console.log(dataVinos)


//FUNCIÓN PARA CAMBIAR DE PÁGINA

for (var i = 0; i < selectNav.length; i++) {
    const element = selectNav[i];
    buttonNav.push(selectNav[i].innerText);
    element.addEventListener("click", function (e) {
        imprimir(e.target.id);
    });
}

function imprimir(id) {
    switch (id) {
        case "about":
            video.style.display = "none";
            form.innerHTML = ""
            bodegas.innerHTML = ""
            vinosContainer.style.display = "none";
            allWines.style.display = "none"

            window.history.replaceState(null, null, window.location.origin + "/index.html?time=about");

            break;
        case "our_history":
            video.style.display = "none";
            form.innerHTML = ""
            bodegas.innerHTML = ""
            vinosContainer.style.display = "none";
            allWines.style.display = "none"

            window.history.replaceState(null, null, window.location.origin + "/index.html?time=nuestra-historia");

            break;
        case "cellars":
            video.style.display = "none";
            form.innerHTML = ""
            vinosContainer.style.display = "none";
            allWines.style.display = "none"


            printCellers();
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=bodegas");

            break;
        case "shop":
            video.style.display = "none";
            form.innerHTML = ""
            bodegas.innerHTML = ""
            vinosContainer.style.display = "none";
            allWines.style.display = "flex"

            print(dataVinos);
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=shop");
            break;
        case "red-wine":
            video.style.display = "none";
            form.innerHTML = ""
            bodegas.innerHTML = ""
            vinosContainer.style.display = "none";
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=shop/vinos-rojos");

            break;
        case "white-wine":
            video.style.display = "none";
            form.innerHTML = ""
            bodegas.innerHTML = ""
            vinosContainer.style.display = "none";

            window.history.replaceState(null, null, window.location.origin + "/index.html?time=shop/vinos-blancos");
            break;
        case "chardonnay":
            video.style.display = "none";
            form.innerHTML = ""
            bodegas.innerHTML = ""

            vinosContainer.style.display = "none";

            window.history.replaceState(null, null, window.location.origin + "/index.html?time=shop/chardonnay");
            break;
        case "contact":
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=contact");
            video.style.display = "none";
            bodegas.innerHTML = ""
            allWines.innerHTML = ""
            allWines.style.display = "none"
            vinosContainer.style.display = "none";
            printForm();

            break;
        default:
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=home");
            form.innerHTML = ""
            bodegas.innerHTML = ""
            allWines.innerHTML = ""
            vinosContainer.style.display = "block";
            allWines.style.display = "none"

            video.style.display = "block"
    }
}


function print(vinosArray) {
    if (Array.isArray(vinosArray)) {
        const vinosHTML = vinosArray.map(dataVinos =>
            `
            <div class="card_container1 hvr-grow1">
            <div class="container_image1">
                <img class="img_pages1"
                    src="${dataVinos.Image}"
                    alt="Vinos">
            </div>
            <div class="container_description1">
                <h4>${dataVinos.Name}</h4>
            </div>
            <div class="container_details1">
                <p>$${dataVinos.Price}</p>
                <a class="button_index1" href="/Pages/Details.html?id=${dataVinos.id}">Detalle</a>
            </div>
        </div>
      
      `
        ).join("");

        allWines.innerHTML = vinosHTML;
    } else {
        // Manejar la situación cuando eventosArray no es un array válido
        console.error("eventosArray no es un array válido:", vinosArray);
    }
}


// FUNCIÓN IMPRIMIR FORMULARIO
function printForm() {
    form.innerHTML = `
        <div class="contenedor-form">
            <div class="contact-wrapper animated bounceInUp contenedor-hijo">
                <div class="contact-form">
                    <form id="contactForm">
                        <p>
                            <label>Nombre y Apellido</label>
                            <input type="text" name="nombreApellido">
                        </p>
                        <p>
                            <label>Email</label>
                            <input type="email" name="email">
                        </p>
                        <p>
                            <label>Número de teléfono</label>
                            <input type="tel" name="telefono">
                        </p>
                        <p class="block">
                            <label>Mensaje</label>
                            <textarea name="mensaje" rows="3"></textarea>
                        </p>
                        <p class="block">
                            <input type="submit" id="buttonForm" class="button_contact" value="ENVIAR">
                        </p>
                    </form>
                </div>
                <div class="contact-info">
                    <h4>Más Info:</h4>
                    <ul>
                        <li>Ubicación: Mendoza</li>
                    </ul>
                    <p>Contamos con bodegas ganadoras de premios internacionales</p>
                    <p>Argentina</p>
                </div>
            </div>
        </div>
    `;

    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        actionForm(event);
    });
}

// SWAL ALRET FORMULARIO DE CONTACTO

function actionForm(event) {
    event.preventDefault();

    const formData = {
        nombre: event.target.elements["nombreApellido"].value,
        correo: event.target.elements["email"].value,
        telefono: event.target.elements["telefono"].value,
        mensaje: event.target.elements["mensaje"].value,
    };

    console.log(formData);

    // Vaciar los campos del formulario
    event.target.elements["nombreApellido"].value = "";
    event.target.elements["email"].value = "";
    event.target.elements["telefono"].value = "";
    event.target.elements["mensaje"].value = "";

    swal({
        title: `Gracias ${formData.nombre} por dejarnos tu comentario. A la brevedad nos contactaremos.`,
        icon: "success",
        button: "Continuar",
    });
}

// FUNCIÓN IMPRIMIR DATOS BODEGAS

function printCellers() {
    bodegas.innerHTML = `
        <div class="container-name1">
            <h1>Nuestras Bodegas</h1>
        </div>

        <div class="container">
            <!-- ZUCARDI -->
            <div class="card1">
                <div class="card-container-before">
                    <h1 class="title_card">Zuccardi</h1>
                    <div class="black-card"></div>
                    <img src="./multimedia/Familia-Zuccardi.jpg" alt="" class="card_img">
                </div>
                <div class="card-container-after">
                    <div class="info-container">
                        <h1 class="title-card-after">Tour por nuestra bodega Zucardi</h1>
                        <p class="paragraph-card-after">Se encuentra en Paraje Altamira, San Carlos, Mendoza. Desde
                            2008 la bodega cuenta con un área de Investigación y Desarrollo. El objetivo es “no
                            buscar vinos perfectos, sino aquellos que expresen el lugar, la región”
                        </p>
                        <ul class="info-card-after">
                            <li>
                                <p class="paragraph-info-card-after">
                                    <span class="title-info-card">Duración:</span> 1 hora
                                </p>
                            </li>
                            <li>
                                <p class="paragraph-info-card-after">
                                    <span class="title-info-card">Idiomas:</span> Español, Inglés y Portugués
                                </p>
                            </li>
                            <li>
                                <p class="paragraph-info-card-after">
                                    <span class="title-info-card">Días:</span> Lunes a Domingo, horario según la
                                    disponibilidad.
                                </p>
                            </li>
                            <li>
                                <p class="paragraph-info-card-after">
                                    <span class="title-info-card">Valor:</span> 50.000
                                </p>
                            </li>
                        </ul>
                    </div>
                    <input type="button" class="reserve-button" value="Reservar Tour">
                </div>
            </div>

            <!-- BODEGA TRAPICHE -->
            <div class="card1">
                <div class="card-container-before">
                    <h1 class="title_card">Bodega Trapiche</h1>
                    <div class="black-card"></div>
                    <img src="./multimedia/Trapiche.jpg" alt="" class="card_img">
                </div>
                <div class="card-container-after">
                    <div class="info-container">
                        <h1 class="title-card-after">Tour por nuestra bodega Trapiche</h1>
                        <p class="paragraph-card-after">Ubicada en Maipú, Mendoza. La bodega fue pionera en la
                            introducción de cepas francesas, la importación de barricas de roble francés y la
                            introducción de vinos provenientes de un micro-terroir.
                        </p>
                        <ul class="info-card-after">
                            <li>
                                <p class="paragraph-info-card-after">
                                    <span class="title-info-card">Duración:</span> 2 horas
                                </p>
                            </li>
                            <li>
                                <p class="paragraph-info-card-after">
                                    <span class="title-info-card">Idiomas:</span> Español, Inglés y Portugués
                                </p>
                            </li>
                            <li>
                                <p class="paragraph-info-card-after">
                                    <span class="title-info-card">Días:</span> Lunes a Domingo, horario según la
                                    disponibilidad.
                                </p>
                            </li>
                            <li>
                                <p class="paragraph-info-card-after">
                                    <span class="title-info-card">Valor:</span> 75.000 incluido.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <input type="button" class="reserve-button" value="Reservar Tour">
                </div>
            </div>

            <!-- CASA TRIVENTO -->
            <div class="card1">
                <div class="card-container-before">
                    <h1 class="title_card">Bodega Trivento</h1>
                    <div class="black-card"></div>
                    <img src="./multimedia/trivento.jpg" alt="" class="card_img">
                </div>
                <div class="card-container-after">
                    <div class="info-container">
                        <h1 class="title-card-after">Tour por nuestra bodega Trivento</h1>
                        <p class="paragraph-card-after">Ubicada en el paraje de Chachingo de Maipú, inspirada en el
                            mágico mundo de la Divina Comedia de Dante Alighieri. Una bodega
                            que invita a experimentar el encanto del vino, la gastronomía y la literatura fusionados
                            en una propuesta enoturística única.
                        </p>
                        <ul class="info-card-after">
                            <li>
                                <p class="paragraph-info-card-after">
                                    <span class="title-info-card">Duración:</span> 1 hora
                                </p>
                            </li>
                            <li>
                                <p class="paragraph-info-card-after">
                                    <span class="title-info-card">Idiomas:</span> Español, Inglés y Portugués
                                </p>
                            </li>
                            <li>
                                <p class="paragraph-info-card-after">
                                    <span class="title-info-card">Días:</span> Lunes a Domingo, horario según la
                                    disponibilidad.
                                </p>
                            </li>
                            <li>
                                <p class="paragraph-info-card-after">
                                    <span class="title-info-card">Valor:</span> 65.000 incluido.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <input type="button" class="reserve-button" value="Reservar Tour">
                </div>
            </div>
        </div>
    `;

    let reserveButtons = document.querySelectorAll(".reserve-button");
    reserveButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            actionCellers(event);
        });
    });
}

function actionCellers(event) {
    swal({
        title: "Gracias por tu reserva, a la brevedad te contactaremos.",
        icon: "success",
        button: "Continuar",
    });
}