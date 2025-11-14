let num1 = '';
let num2 = '';


function actualizacionPantalla(){
    let display = document.getElementById("display");
    display.innerText += value;
}

function limpiarDisplay (){
    let display = document.getElementById("display");
    display = '';
}

function sumar(){
    const resultado = num1 + num2;
    actualizacionPantalla(resultado);
}

function restar(){
    const resultado = num1 - num2;
    actualizacionPantalla(resultado);
}

function multiplicacion(){
    const resultado = num1 * num2;
    actualizacionPantalla(resultado);
}

function division(){
    const resultado = num1 / num2;
    actualizacionPantalla(resultado);
}

function borrar(){
    const display = document.getElementById("display")
    display.innerText = display.innerText.slice(0,-1);
}