const boton = document.querySelector("#boton-enviar");
const input = document.querySelectorAll("form input");
const estado = document.querySelector("#estado");

const actualizarProducto = (productos) => {
  const datos = {
    administrador: true,
    data: productos,
  };
  console.log("http://localhost:8080/api/productos/" + productos.id);
  fetch("http://localhost:8080/api/productos/" + productos.id, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(datos),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      estado.innerHTML = response.descripcion;
    })
    .catch((e) => {
      console.log(e);
      estado.innerHTML = "Error en la carga de producto";
    });
};

boton.addEventListener("click", (e) => {
  e.preventDefault();
  let productos = {};
  input.forEach((element) => {
    if (element.value !== "") productos[element.name] = element.value;
  });
  if (productos.id === "") return;
  else {
    console.log(productos);
    actualizarProducto(productos);
  }
});
