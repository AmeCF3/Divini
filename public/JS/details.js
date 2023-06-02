var htmlDetalle = document.getElementById("detalles");

function displayDetalle(id) {
  var detalleVino = [];
  console.log(dataVinos);

  for (var i = 0; i < dataVinos.length; i++) {
    if (dataVinos[i].id == id) {
      detalleVino.push(dataVinos[i]);
    }
  }

  console.log(detalleVino);

  var contenidoDetalle = `
  <div class="tituloDetalle"><p>${detalleVino[0].Name}</p></div>
    <div class="detalleIzquierda">
        <div class="galeriaDetalle">
          <div class="card card-detalle">
            <img src="${detalleVino[0].Image}" alt="${detalleVino[0].Winery}">
          </div>
        </div>
    </div>

    <!-- FICHA TECNICA -->

    <div class="card text-center personalizada">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <p>FICHA TÉCNICA</p>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <table class="table table-hover">
          <tbody>
            <tr>
              <td><p>Bodega:</p> ${detalleVino[0].Winery}</td>
            </tr>
            <tr>
              <td><p>Variedad:</p> Vino ${detalleVino[0].Variety}</td>
            </tr>
            <tr>
              <td><p>Descripción:</p> ${detalleVino[0].Description}</td>
            </tr>
            <tr>
              <td><p>Precio:</p> $${detalleVino[0].Price}</td>
            </tr>
            <tr>
              <td> <p>Crianza:</p>${detalleVino[0].Maturation}</td>
            </tr>
            <tr>
              <td><p>Cosecha:</p> ${detalleVino[0].Harvest}</td>
            </tr>
          </tbody>
        </table>
        <input type="submit" id="buttonShop" class="button_shop" value="Agregar a la bolsa">
      </div>
    </div>
  `;

  htmlDetalle.style.display = "flex";
  htmlDetalle.innerHTML = contenidoDetalle;
  form.innerHTML = "";
  bodegas.innerHTML = "";
  allWines.innerHTML = "";
  vinosContainer.style.display = "none";
  video.style.display = "none";
  allWines.style.display = "none";
  history.innerHTML = "";
}
function apagardetalles() {
    htmlDetalle.innerHTML = "" }