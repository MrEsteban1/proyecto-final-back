const adminMenu = document.querySelector("#adminMenu")
const carrito = document.querySelector("#carrito");
const productos_list = document.querySelector("#productos-list");
const nombreCliente =document.querySelector("#nombre-cliente")
      
let button_send;
      
carrito.innerHTML = 1;

const filtroCat = document.querySelector("#filtroCategoria")

filtroCat.addEventListener("change",e=>{
  e.preventDefault()
  getProdByCategoria(e.target.value)
  
})

      const getProdByCategoria = categoria => {
        console.log("Enviar categoria: ",categoria)
        fetch("/api/productos/categoria/" + categoria)
        .then((res) => res.json())
        .then((data) => renderProductos(data.data))
        .catch((e) => {
          console.log(e)
          alert("No se pudo cargar los productos")
        });
      }
      
      const getProductos = (id = "") => {
        
        fetch("/api/productos/" + id)
          .then((res) => res.json())
          .then((data) => renderProductos(data.data))
          .catch((e) => console.log(e));
      };
      
      //Validar si el usuario esta conectado
      const validateUser = () => {
         fetch("/session/userLoged")
           .then((res) => res.json())
           .then((data) =>{
            console.log(data)
            if(data.estado){
              nombreCliente.innerHTML = `Bienvenido ${data.nombre}`
              if(!!data.admin) adminMenu.className = adminMenu.className.slice(0,adminMenu.className.length-6)
            } else window.location.pathname = "/login"
          })
           .catch((e) => console.log(e));
      };
      
      validateUser()
      
      const renderProductos = async (productos) => {
        let html = "";
        console.log(productos);
        if (productos.lenght <= 0) {
          productos_list.innerHTML = `<span class="placeholder col-12 bg-danger">No hay productos para mostrar...</span>`;
        } else if (productos.length > 0) {
          console.log(productos);
          await productos.forEach((producto) => {
            html += cardProducto(producto);
          });
          productos_list.innerHTML = html;
      
          button_send = document.querySelectorAll(".boton-agregarCarrito");
      
          button_send.forEach((element) => {
            element.addEventListener("click", async (e) => {
              e.preventDefault()
              element.innerHTML = loaderSpinner();
              let id = sessionStorage.getItem("id_carrito");
              if (!!id) {
                console.log("pasa por aca", element.value);
                fetch(`/api/productos/${element.value}`)
                  .then((response) => response.json())
                  .then((data) => agregarProducto(id, data))
                  .catch((e) => console.log(e));
              } else {
                console.log("pasa por aca 2",`http://localhost:8080/api/productos/${element.value}`);
                fetch(`/api/productos/${element.value}`)
                  .then((response) => response.json())
                  .then((data) =>{console.log(data); return crearCarrito(data)})
                  .catch((e) => console.log(e));
              }
            });
          });
        } else {
          productos_list.innerHTML = `<span class="placeholder col-12 bg-danger">No se pudo mostrar el catalogo...</span>`;
        }
      };
      
      const crearCarrito = (productos) => {
        fetch(`/api/carrito/`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(productos),
        })
          .then((response) => response.json())
          .then(({data}) => {
            console.log(data)
            sessionStorage.setItem("id_carrito", data.id.toString());
            console.log(data.id.toString());
          })
          .catch((e) => console.log(e));
      };
      
      const agregarProducto = (id, producto) => {
        fetch(`/api/carrito/${id}/producto`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(producto),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            alert(data.descripcion);
          })
          .catch((e) => console.log(e));
      };
      
      const cardProducto = (producto) =>
        `<div class="card m-2" style="width: 18rem;">
              <p class="form-text">ID: ${producto.id}</p>
              <img src="${producto.imagen}" class="card-img-top" height="200" alt="...">
              <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Precio: $${producto.precio}</p>
                <button href="#" value=${producto.id} class="btn btn-primary boton-agregarCarrito">Agregar al carrito</button>
              </div>
      </div>`;
      
      const loaderSpinner = () =>
        `<div class="spinner-grow mx-2" role="status">
          <span class="visually-hidden">Loading...</span>
      </div>`;
      
      getProductos();