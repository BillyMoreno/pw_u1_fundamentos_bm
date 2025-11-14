let currentExpression = '';  // Guarda toda la expresión (ej: "7+2*3")
let resetDisplay = false;

function updateDisplay(value) {
    const display = document.getElementById('display');

    // Si se presionó "=" antes, limpiar pantalla
    if (resetDisplay) {
        display.innerText = '';
        currentExpression = '';
        resetDisplay = false;
    }

    // Evitar múltiples puntos seguidos
    const lastChar = display.innerText.slice(-1);
    if (value === '.' && (lastChar === '.' || lastChar === '')) return;

    // Evitar operadores seguidos
    if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(lastChar)) {
        return;
    }

    // Agregar valor al display y a la expresión
    display.innerText += value;
    currentExpression += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.innerText = '';
    currentExpression = '';
    resetDisplay = false;


let number1 = '';
let number2 = '';

function updateDisplay(value) {
    let display = document.getElementById('display'); //document es para hacer referenia al doom y get busca el elemento del doom con la caracterisitca que diga display
    display.innerText += value; //innerText SIVER PARA concatenar el texto y usamos += para ir sumando caracteres con value
}

function clearDisplay() {
    let display = document.getElementById('display');
    display.innerText = '';
    //number1 = '';
    //number2 = '';
}


function add(a, b) {
    const result = a + b;
    const display = document.getElementById('display');
    display.innerText = result;
    return result;
}

function subtract(a, b) {
    const result = a - b;
    const display = document.getElementById('display');
    display.innerText = result;
    return result;
}

function multiply(a, b) {
    const result = a * b;
    const display = document.getElementById('display');
    display.innerText = result;
    return result;
}

function divide(a, b) {
    const result = a / b;
    const display = document.getElementById('display');
    display.innerText = result;
    return result;
>>>>>>> 0260501b1a4db51f67b9df98c279162a9b965ea9
}

function backspace() {
    const display = document.getElementById('display');
    display.innerText = display.innerText.slice(0, -1);
<<<<<<< HEAD
    currentExpression = currentExpression.slice(0, -1);
}

function percentage() {
    const display = document.getElementById('display');
    if (display.innerText === '') return;
    
    // Convierte el número actual en porcentaje (divide entre 100)
    const result = parseFloat(display.innerText) / 100;
    display.innerText = result;
    currentExpression = result.toString();
    resetDisplay = true;
}

function calculateResult() {
    const display = document.getElementById('display');
    if (currentExpression === '') return;

    try {
        const result = eval(currentExpression); // evalúa la expresión (7+2*3)
        display.innerText = result;
        currentExpression = result.toString();
        resetDisplay = true; // indica que el siguiente número reinicia el display
    } catch {
        display.innerText = 'Error';
        currentExpression = '';
        resetDisplay = true;
    }
}
=======
}

function calculateResult(){
    const display = document.getElementById('display');
    const expression = display.innerText;
    const operators = ['+', '-', '*', '/'];
    let operatorFound = null;

    for (let i = 0; i < expression.length; i++) {
        if (operators.includes(expression[i])) {
            operatorFound = expression[i];
            break;
        }
    }

    if (operatorFound) {
        const parts = expression.split(operatorFound);
        const num1 = parseFloat(parts[0]);
        const num2 = parseFloat(parts.slice(1).join(operatorFound));

        // Validaciones
        if (isNaN(num1) || isNaN(num2)) {
            display.innerText = 'Error';
            return;
        }

        if (operatorFound === '/' && num2 === 0) {
            display.innerText = 'Error: división por cero';
            return;
        }

        switch (operatorFound) {
            case '+':
                add(num1, num2);
                break;
            case '-':
                subtract(num1, num2);
                break;
            case '*':
                multiply(num1, num2);
                break;
            case '/':
                divide(num1, num2);
                break;
        }
    }
}

>>>>>>> 0260501b1a4db51f67b9df98c279162a9b965ea9
