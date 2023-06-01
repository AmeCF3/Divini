var htmlDetalle = document.getElementById("detalles")
function displayDetalle(id) {


  var detalleVino = []
  console.log(dataVinos)

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
    <ul class="ft">
      
        <a>FICHA TÉCNICA</a>
      
    </ul>
  </div>
  <div class="card-body">
    <table class="table table-hover">
      <tbody>
        <tr>
          <th scope="row">Bodega</th>
          <td scope="row">${detalleVino[0].Winery}</td>
        </tr>
  
        <tr>
          <th scope="row">Variedad</th>
          <td scope="row">${detalleVino[0].Variety}</td>
        </tr>

        <tr>
          <th scope="row">Descripción</th>
          <td colspan="2"> ${detalleVino[0].Description}</td>
        </tr>

        <tr>
          <th scope="row">Precio</th>
          <td scope="row">$${detalleVino[0].Price}</td>
        </tr>
    
        <tr>
          <th scope="row">Crianza</th>
          <td scope="row">${detalleVino[0].Maturation}</td>
        </tr>

        <tr>
          <th scope="row">Cosecha</th>
          <td scope="row"> ${detalleVino[0].Harvest}</td>
        </tr>

      </tbody>
    </table>
  </div>
  </div>
    `
    htmlDetalle.style.display = "flex"
    htmlDetalle.innerHTML = contenidoDetalle
    form.innerHTML = ""
    bodegas.innerHTML = ""
    allWines.innerHTML = ""
    vinosContainer.style.display = "none";
    allWines.style.display = "none"
    history.innerHTML = "" 
    window.history.replaceState(null, null, window.location.origin + "/index.html?time=detalles"); 
}


function apagardetalles() {
  htmlDetalle.innerHTML = ""
}