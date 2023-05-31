function displayDetalle(id) {
   

    var detalleVino = []
    console.log (dataVinos)

    for (var i = 0; i < dataVinos.length; i++) {
        if (dataVinos[i].id == id) {
            detalleVino.push(dataVinos[i]);

        }
    }

    console.log(detalleVino)

    var contenidoDetalle
    contenidoDetalle =
        `<div class="detalleIzquierda">
            <div class="tituloDetalle"><p>${detalleVino[0].Name}</p></div>
            <div class="galeriaDetalle">
              <div class="card card-detalle">
                <img src=${detalleVino[0].Image} alt="${detalleVino[0].Winery}">
              </div>
            </div>
        </div>

<!-- FICHA TECNICA -->
<div class="card text-center personalizada">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" aria-current="true" href="#">FICHA TÉCNICA</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <table class="table table-hover">
      <tbody>
        <tr>
          <th scope="row">Bodega: ${detalleVino[0].Winery}</th>
          <td></td>
        </tr>
    
        <tr>
          <th scope="row">Crianza: ${detalleVino[0].Maturation}</th>
          <td></td>
        </tr>
     
        <tr>
          <th scope="row">Tipo de producto: Vino ${detalleVino[0].Variety}</th>
          <td></td>
        </tr>
    
        <tr>
          <th scope="row">Descripción:${detalleVino[0].Description}</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Precio:${detalleVino[0].Price}</th>
          <td></td>
        </tr>

        <tr>
        <th scope="row">Cosecha:${detalleVino[0].Harvest}</th>
        <td></td>
      </tr>
      </tbody>
    </table>
    </table>
  </div>
  </div>
    `

    var htmlDetalle = document.getElementById("detalles")
    htmlDetalle.style.display = "flex"
    htmlDetalle.innerHTML = contenidoDetalle
    form.innerHTML = ""
    bodegas.innerHTML = ""
    allWines.innerHTML = ""
    vinosContainer.style.display = "none";
    allWines.style.display = "none"
    history.innerHTML = ""
}