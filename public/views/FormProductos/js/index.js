const button = document.querySelector("#boton-enviar");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const datosForm = document.querySelectorAll("input");
  const categoria = document.querySelector("select")
  const producto = {
    administrador: true,
    data: {
      timestamp: Date.now(),
      nombre: datosForm[0].value,
      precio: datosForm[1].value,
      stock: datosForm[2].value,
      descripcion: datosForm[3].value,
      categoria: categoria.value,
      imagen: datosForm[4].value,
    },
  };
  
  fetch("http://localhost:8080/api/productos/", {
    method: "POST", // or 'PUT'
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(producto),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.estado === "error") console.log(data);
      document.querySelector("#error-form").innerHTML = "Se cargo el producto";
    })
    .catch((e) => {
      console.log(e)(
        (document.querySelector("#error-form").innerHTML = "Error en la carga")
      );
    });

  console.log(producto);
});
