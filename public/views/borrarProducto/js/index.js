const boton = document.querySelector("#enviar");
const input = document.querySelector("form input");
const estado = document.querySelector("#estado");

const borrarProducto = (id) => {
  fetch("http://localhost:8080/api/productos/" + id, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ administrador: true }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      estado.innerHTML = response.descripcion;
    })
    .catch((e) => {
      console.log(e);
      estado.innerHTML = "Error al borrar";
    });
};

boton.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value !== "") borrarProducto(input.value);
  else {
    estado.innerHTML = "Debe ingresar id";
  }
});
