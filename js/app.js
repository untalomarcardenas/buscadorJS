// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const yearMax = new Date().getFullYear() //Obtenemos el año actual
const yearMin = yearMax - 10; 

// Genera un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    modelo: '',
    year: '',
    minimo: '',
    maximo:'',
    puertas: '',
    color:'',
    transmision:''
}


// Eventos
document.addEventListener('DOMContentLoaded', ()=>{
    // Carga la informacion de los autos
    mostrarAutos(autos); 

    // Llena las opciones de años
    llenarSelect()
});

marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});
year.addEventListener('change', e =>{
    datosBusqueda.year = e.target.value;
    filtrarAuto();
});
minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});
maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});
puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});
transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});
color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});




// Funciones
function mostrarAutos(autos){

    limpiarHTML();
    autos.forEach( auto =>{
        const { marca, modelo, year, precio, puertas, color, transmision} = auto;
        const autoHTML = document.createElement('P');
        autoHTML.textContent = `
            ${marca} - ${modelo} - ${year} - Precio: $${precio} - Puertas: ${puertas} - Color: ${color} - Transmision: ${transmision}
        `;

        // Insertando
        resultado.appendChild(autoHTML)
    });

}

// Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

// Genera los años en el select
function llenarSelect(){
    for(let i = yearMax; i >= yearMin ; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;

        year.appendChild(opcion);
    }
}

// Filtra 
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
    
    
    if(resultado.length){
        console.log("Si")
        mostrarAutos(resultado);
    }
    else{
        console.log("No")
        noResultado();
        
    }
}

function noResultado(){
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = "No se encontraron resultados"
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca
    }
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === parseInt(year)
    }
    return auto;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= parseInt(minimo)
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= parseInt(maximo)
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === parseInt(puertas)
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}

