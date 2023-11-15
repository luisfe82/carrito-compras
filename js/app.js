// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articuloCarrito = [];

cargarEventListener();
function cargarEventListener() {
    //Cuamdo agregas un curso presionando "Agregar al Curso"
    listaCursos.addEventListener('click',agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    //Vaciar del carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articuloCarrito = []; //Reseteamos el arreglo

        limpiarHTML(); //Limpiamos el HTML del carrito
    })
}


//Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        LeerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo de articulos por el data-id
        articuloCarrito = articuloCarrito.filter(curso => curso.id !== cursoId);

        carriroHtml();
    }

}

//Funcion que lea el contenido del boton que se presiono
function LeerDatosCurso(curso) {

    //Crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articuloCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articuloCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizados
            }else{
                return curso;   //retorna  el objeto sin actualizar
            }
        })
        articuloCarrito = [...cursos];
    }else {
        //Agrega elementos al arreglo de carrito
        articuloCarrito = [...articuloCarrito,infoCurso];
    }   

    carriroHtml();
}

//Muestra el Carrito de compras en el HTML
function carriroHtml() {
    //Limpiar el HTML carrito
    limpiarHTML();

    //Recorre el carrito y genera el Html
    articuloCarrito.forEach( curso =>{
        const row = document.createElement('tr');
        const {imagen,titulo,precio,cantidad,id} = curso;
        row.innerHTML = `
            <td><img src="${imagen}" width=100></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //Forma lenta de borrar contenido
    // contenedorCarrito.innerHTML = ''

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
