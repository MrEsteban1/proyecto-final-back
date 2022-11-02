const productos_list = document.querySelector("#carrito-list");
let botones;
let pedidos;
let cliente;

const validarID = (id) => {
  console.log(id);
  if (!!id) {
    productos_list.innerHTML = "Cargando Carrito..";
    infoCarrito(id);
  } else {
    productos_list.innerHTML =
      "No se encuentra el carrito, vuelva al catalogo.";
  }
};

const infoCliente = () => {
  const info_section = document.querySelector("#info-cliente");
  fetch("/session/userLoged")
    .then((res) => res.json())
    .then((data) => {
      let htmlInfo;
      if (data.estado) {
        cliente = data;
        console.log(data)
        htmlInfo = `<ul class="list-group">
        <li class="list-group-item active" aria-current="true">Información del cliente:</li>
        <li class="list-group-item">Nombre: ${data.nombre}</li>
        <li class="list-group-item">Edad: ${data.edad}</li>
        <li class="list-group-item">E-mail: ${data.username}</li>
        <li class="list-group-item">Telefono: ${data.telefono}</li>
      </ul>`;
      }
      info_section.innerHTML = htmlInfo;
      console.log(data);
    })
    .catch((e) => console.log(e));
};

infoCliente();

const infoCarrito = (id) => {
  fetch(`http://localhost:8080/api/carrito/${id}`)
    .then((response) => response.json())
    .then((data) => {
      pedidos = data;
      renderProductos(data.productos, id);
    });
  //.catch((e) => console.log(e));
};

validarID(sessionStorage.getItem("id_carrito"));

const renderProductos = async (productos, id) => {
  console.log(productos);
  const listProducts = await productos.map(
    (producto, i) =>
      `<tr>
        <th scope="row">${i}</th>
        <td>${producto.nombre}</td>
        <td>$ ${producto.precio}</td>
        <td><img src="${producto.imagen}" alt="${producto.descripcion}" width="40" height="40"></td>
        <td><button value=${producto.id} class="btn btn-danger">Eliminar</button></td>
    </tr>`
  );

  const htmlTable = `<table class="table table-warning p-2">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Imagen</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
        ${listProducts.join("")}
        <tbody>
    </table>
    <td>
      <button value=${id} id="eliminar-carrito" class="btn btn-danger">Eliminar carrito</button>
      <button value=${id} id="pedido-carrito" class="btn btn-danger">Realizar pedido</button>
    </td>`;
  productos_list.innerHTML = htmlTable;
  botones = document.querySelectorAll("td .btn");
  let boton_eliminarCarrito = document.querySelector("#eliminar-carrito");
  let boton_pedido = document.querySelector("#pedido-carrito");

  boton_eliminarCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    borrarCarrito(id);
  });

  boton_pedido.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("pedido carrito");
    fetch("/api/carrito/pedido", {
      method: "POST", // or 'PUT'
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: cliente.username,
        nombre: cliente.nombre,
        ...pedidos,
      }),
    })
      .then((res) => {
        res.status === 200  ? (borrarCarrito(sessionStorage.getItem("id_carrito")), alert("Se genero la compra"))
                            : alert("No se pudo cargar la compra.")
      })
      .catch((e) => console.log(e));
  });

  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(boton.value);
      borraProducto(boton.value);
    });
  });
};

const borraProducto = (id) => {
  fetch(
    `http://localhost:8080/api/carrito/${sessionStorage.getItem(
      "id_carrito"
    )}/productos/${id}`,
    {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      data.estado === "OK"
        ? validarID(sessionStorage.getItem("id_carrito"))
        : alert("No se pudo eliminar el dato");
    })
    .catch((e) => console.log(e));
};

const borrarCarrito = (id) => {
  fetch(
    `http://localhost:8080/api/carrito/${sessionStorage.getItem("id_carrito")}`,
    {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      data.estado === "OK"
        ? (sessionStorage.removeItem("id_carrito"),
          validarID(sessionStorage.getItem("id_carrito")))
        : alert("No se pudo borrar el carrito");
    });
  //.catch((e) => console.log(e));
};
