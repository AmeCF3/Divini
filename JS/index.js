var selectNav = document.querySelectorAll(".link_nav");
let video = document.getElementById("video")
var form = document.getElementById("form")
let bodegas = document.getElementById("info-cellers")
let vinosContainer = document.getElementById("vinos-container")
let allWines = document.getElementById("allWines")
let cardsShop = document.getElementsByClassName("card-container-general1")
let history =document.getElementById("history")
let positionName = document.getElementById ("position-name")

var buttonNav = [];
let dataVinos = [];

// LLAMADO A LA API
const coleccionVinos = firebase.firestore().collection("BBDD");

function getDataVinos() {
    coleccionVinos.get()
        .then((results) => {
            dataVinos = results.docs
                .filter((doc) => doc.data().Category === "vinos")
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            console.log(dataVinos);
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });
}

// Llamar a la función para obtener los vinos automáticamente
getDataVinos();


//FUNCIÓN PARA CAMBIAR DE PÁGINA

for (var i = 0; i < selectNav.length; i++) {
    const element = selectNav[i];
    buttonNav.push(selectNav[i].innerText);
    element.addEventListener("click", function (e) {
        imprimir(e.target.id);
    });
}

function imprimir(id) {
    let redWines;
    let whiteWines;

    switch (id) {
        case "about":
            video.style.display = "none";
            form.innerHTML = "";
            bodegas.innerHTML = "";
            vinosContainer.style.display = "none";
            allWines.style.display = "none";
            printHistory();
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=nuestra-historia");
            break;          
        case "cellars":
            video.style.display = "none";
            form.innerHTML = ""
            vinosContainer.style.display = "none";
            allWines.style.display = "none"
            history.innerHTML = ""
            printCellers();
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=bodegas");
            break;
        case "shop":
            video.style.display = "none";
            form.innerHTML = ""
            bodegas.innerHTML = ""
            vinosContainer.style.display = "block";
            positionName.innerHTML = "Todos nuestros vinos"
            allWines.style.display = "flex"
            history.innerHTML = ""
            print(dataVinos);
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=shop");
            break;
        case "red-wine":
            video.style.display = "none";
            form.innerHTML = ""
            bodegas.innerHTML = ""
            vinosContainer.style.display = "block";
            positionName.innerHTML = "Nuestros vinos tintos"
            history.innerHTML = ""
            allWines.style.display = "flex"
            redWines = dataVinos.filter((vino) => vino.Variety === "Cabernet Sauvignon" || vino.Variety === "Malbec");
            print(redWines);
            console.log(redWines);
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=shop/vinos-rojos");
            break;
        case "white-wine":
            video.style.display = "none";
            form.innerHTML = ""
            bodegas.innerHTML = ""
            vinosContainer.style.display = "block";
            positionName.innerHTML = "Nuestros vinos blancos"
            history.innerHTML = ""
            allWines.style.display = "flex"
            whiteWines = dataVinos.filter((vino) => vino.Variety === "Chardonnay");
            print(whiteWines)

            window.history.replaceState(null, null, window.location.origin + "/index.html?time=shop/vinos-blancos");
            break;
        case "contact":
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=contact");
            video.style.display = "none";
            bodegas.innerHTML = ""
            allWines.style.display = "none"
            vinosContainer.style.display = "none";
            history.innerHTML = ""
            printForm();
            break;
        default:
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=home");
            form.innerHTML = ""
            bodegas.innerHTML = ""
            allWines.innerHTML = ""
            vinosContainer.style.display = "block";
            allWines.style.display = "flex"
            history.innerHTML = ""
            video.style.display = "block"
            positionName.innerHTML = "Nuestros más económicos"
            const vinosFiltrados = dataVinos.filter((vino) => vino.Price <= 1500);
            print(vinosFiltrados)
    }
}

// FUNCION PARA PINTAR LAS TARJETAS 
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
                    <p class="ubication-form">Ubicación: Mendoza</p>
                    <p>Contamos con bodegas ganadoras de premios internacionales</p>
                    <p>Argentina</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107218.22847454064!2d-69.00617748847809!3d-32.883104262772584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e093ec45179bf%3A0x205a78f6d20efa3a!2sMendoza%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1685420516573!5m2!1ses!2sar" class="tag-map" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
        <div class="container-name2">
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

// FUNCION PARA NUESTRA HISTORIA 
function printHistory() {
    history.innerHTML =

        `<div class="history">
            <div class="container-name-history-title">
                <h1>Nuestra Historia</h1>
            </div>
            <div class="container-name-history">
                <h3> Somos una empresa apasionada por el mundo de los vinos y nos complace ofrecerles una selección de
                    vinos
                    de tres destacadas bodegas (Zuccardi, Trapiche y Trivento). Además, queremos compartir nuestra rica
                    historia y experiencia con ustedes. <br>
                   
                    Nuestra historia se remonta a décadas atrás, cuando nuestras bodegas fueron establecidas por
                    apasionados
                    viticultores que vieron en estas tierras el potencial para producir vinos excepcionales. Con el
                    tiempo,
                    hemos perfeccionado nuestras técnicas de cultivo de uvas y métodos de producción para brindarles
                    vinos
                    de la más alta calidad.<br>

                    Cada una de las bodegas asociadas a nuestra página ha dejado su huella en la industria vinícola,
                    gracias
                    a su dedicación y compromiso con la excelencia. Sus vinos son el resultado de la combinación
                    perfecta
                    entre tradición y modernidad, reflejando el carácter único de la región y la pasión de nuestros
                    enólogos.<br>

                    Además de ofrecerles una cuidadosa selección de vinos, también les invitamos a descubrir nuestras
                    bodegas a través de nuestros apasionantes tours. Durante estas visitas, tendrán la oportunidad de
                    sumergirse en el fascinante proceso de elaboración del vino, desde la vendimia hasta la degustación
                    final. Nuestros expertos guías les llevarán a través de nuestros viñedos, bodegas y salas de
                    barricas,
                    compartiendo con ustedes su conocimiento y amor por el vino.</h3>
            </div>
         </div>
    `
}

// BUSCADOR
var inputSearch = document.getElementById("buscador");

inputSearch.addEventListener("keyup", function (event) {
    var datoInput = event.target.value;
    var datosOrdenados = datoInput.trim().toLowerCase();
    var filtrado = dataVinos.filter(vino => vino.Name.toLowerCase().includes(datosOrdenados));

    if (filtrado.length === 0) {
        // No se encontraron resultados
        allWines.innerHTML =
            `<div class="ceroSearch">
                <img class="imgCero" src="./multimedia/nofoundmin.png" alt="SinResultados">
            </div>`;
    } else {
        // Imprimir los resultados filtrados
        print(filtrado);
    }
});
