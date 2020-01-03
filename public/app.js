//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 0,
  to: 100000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
      $('#buscar').text("Ver Todos")
      $("#ciudad").val('Escoge una ciudad')
      $("#tipo").val('Escoge un tipo')
      $('#rangoPrecio').val('0;100000')
    } else {
      this.customSearch = false
      $('#buscar').text("Buscar")
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()

function fillSelects(){
  var url = 'http://localhost:8082/API/cities';
  $.getJSON(url)
    .done(function (data) {
      var sel = $("#ciudad");
      for (var i = 0; i < data.length; i++) {
        sel.append('<option value="' + data[i] + '">' + data[i] + '</option>');
      }
    })
    .fail(function (err) {
      // the error codes are listed on the dev site
      console.log(err);
    });

  var url = 'http://localhost:8082/API/types';
  $.getJSON(url)
    .done(function (data) {
      var sel = $("#tipo");
      for (var i = 0; i < data.length; i++) {
        sel.append('<option value="' + data[i] + '">' + data[i] + '</option>');
      }
    })
    .fail(function (err) {
      // the error codes are listed on the dev site
      console.log(err);
    });

}

function getAllData() {
  if($('#buscar').text()=="Buscar"){
    var rango = $('#rangoPrecio').val()
    var query = "?Min=" + rango.substring(0, rango.indexOf(';')) + "&Max=" + rango.substring(rango.indexOf(';') + 1)
  } else{
    var query = "?Min=0" + "&Max=100000" 
  }
  if ($('#ciudad').val() !="Escoge una ciudad"){
    query = query + "&Ciudad=" + $('#ciudad').val()
  }
  if ($('#tipo').val() != "Escoge un tipo") {
    if (query != "") {
      query = query + "&"
    }  
    query = query + "Tipo=" + $('#tipo').val()
  }
                                                                      
  var url = 'http://localhost:8082/API/properties'+ query;
  console.log (url)
  $.getJSON(url)
    .done(function (data) {
      var sel = $("#propiedades");
      sel.empty()
      for (var i = 0; i < data.length; i++) {
        sel.append('<div class="card horizontal"> \
          <div class="card-image"> \
          <img src="img/home.jpg"> \
          </div> \
          <div class="card-stacked"> \
            <div class="card-content"> \
              <div> \
                <b>Direccion: '+data[i].Direccion+'</b><p></p> \
              </div> \
              <div> \
                <b>Ciudad: '+ data[i].Ciudad +'</b><p></p> \
              </div> \
              <div> \
                <b>Telefono: '+ data[i].Telefono +'</b><p></p> \
              </div> \
              <div> \
                <b>Código postal: '+ data[i].Codigo_Postal +'</b><p></p> \
              </div> \
              <div> \
                <b>Precio: $'+ parseInt(data[i].Precio).toLocaleString() +'</b><p></p> \
              </div> \
              <div> \
                <b>Tipo: '+ data[i].Tipo +'</b><p></p> \
              </div> \
            </div> \
            <div class="card-action right-align"> \
              <a href="#">Ver más</a> \
            </div> \
          </div> \
        </div >');
      }
    })
    .fail(function (err) {
      console.log(err);
    });

}

/* FUNCIÓN DOCUMENT.READY */
$(function () {
  fillSelects()
  $("#buscar").click(getAllData)
})

