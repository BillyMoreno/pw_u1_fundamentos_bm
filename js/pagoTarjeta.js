document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('payment-form');
    const cardholderInput = document.getElementById('cardholder-name');
    const cardNumberInput = document.getElementById('card-number');
    const expDateInput = document.getElementById('exp-date');
    const cvvInput = document.getElementById('cvv');
    
    const cardholderDisplay = document.getElementById('cardholder-display');
    const cardNumberDisplay = document.querySelector('.card-number-display');
    const expiryDisplay = document.getElementById('expiry-display');
    
    const cardholderError = document.getElementById('cardholder-error');
    const cardNumberError = document.getElementById('card-number-error');
    const expDateError = document.getElementById('exp-date-error');
    const cvvError = document.getElementById('cvv-error');

    // Limpiar errores
    function clearErrors() {
        cardholderError.textContent = '';
        cardNumberError.textContent = '';
        expDateError.textContent = '';
        cvvError.textContent = '';
        
        cardholderInput.classList.remove('error');
        cardNumberInput.classList.remove('error');
        expDateInput.classList.remove('error');
        cvvInput.classList.remove('error');
    }

    // Cardholder input
    cardholderInput.addEventListener('input', function(e) {
        cardholderDisplay.textContent = e.target.value || 'Mrs Kate Smith';
        
        // Validación en tiempo real
        if (e.target.value.length > 0) {
            validateCardholder();
        }
    });

    // Formatear número de tarjeta
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
        e.target.value = formattedValue;
        cardNumberDisplay.textContent = formattedValue || '1722 2646 0312 1234';
        
        // Validación en tiempo real
        if (value.length > 0) {
            validateCardNumber();
        }
    });

    // Formatear fecha de expiración
    expDateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
        expiryDisplay.textContent = value || '12/25';
        
        // Validación en tiempo real
        if (value.length > 0) {
            validateExpDate();
        }
    });

    // Validar CVV
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        
        // Validación en tiempo real
        if (e.target.value.length > 0) {
            validateCVV();
        }
    });

    // Funciones de validación
    function validateCardholder() {
        const cardholder = cardholderInput.value.trim();
        if (cardholder.length < 2) {
            cardholderError.textContent = '✗ Nombre demasiado corto';
            cardholderInput.classList.add('error');
            return false;
        } else if (!/^[a-zA-Z\s.'-]+$/.test(cardholder)) {
            cardholderError.textContent = '✗ Solo letras y espacios permitidos';
            cardholderInput.classList.add('error');
            return false;
        } else {
            cardholderError.textContent = '✓ Válido';
            cardholderError.style.color = '#4caf50';
            cardholderInput.classList.remove('error');
            return true;
        }
    }

    function validateCardNumber() {
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
            cardNumberError.textContent = '✗ Número de tarjeta inválido (16 dígitos requeridos)';
            cardNumberInput.classList.add('error');
            return false;
        } else {
            cardNumberError.textContent = '✓ Válido';
            cardNumberError.style.color = '#4caf50';
            cardNumberInput.classList.remove('error');
            return true;
        }
    }

    function validateExpDate() {
        const expDate = expDateInput.value;
        const expRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        
        if (!expRegex.test(expDate)) {
            expDateError.textContent = '✗ Formato inválido (MM/YY)';
            expDateInput.classList.add('error');
            return false;
        } else {
            // Validar que no sea una fecha pasada
            const [month, year] = expDate.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;
            
            if (parseInt(year) < currentYear || 
                (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                expDateError.textContent = '✗ Tarjeta expirada';
                expDateInput.classList.add('error');
                return false;
            }
            
            expDateError.textContent = '✓ Válido';
            expDateError.style.color = '#4caf50';
            expDateInput.classList.remove('error');
            return true;
        }
    }

    function validateCVV() {
        const cvv = cvvInput.value;
        if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
            cvvError.textContent = '✗ CVV inválido (3 dígitos requeridos)';
            cvvInput.classList.add('error');
            return false;
        } else {
            cvvError.textContent = '✓ Válido';
            cvvError.style.color = '#4caf50';
            cvvInput.classList.remove('error');
            return true;
        }
    }

    // Validación del formulario
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors();
        
        const isCardholderValid = validateCardholder();
        const isCardValid = validateCardNumber();
        const isExpValid = validateExpDate();
        const isCVVValid = validateCVV();

        if (isCardholderValid && isCardValid && isExpValid && isCVVValid) {
            // Simular procesamiento de pago
            showLoading();
            setTimeout(() => {
                hideLoading();
                showSuccess();
            }, 2000);
        }
    });

    function showLoading() {
        const button = document.querySelector('.confirm-btn');
        button.textContent = 'Procesando...';
        button.disabled = true;
    }

    function hideLoading() {
        const button = document.querySelector('.confirm-btn');
        button.textContent = 'Confirm Payment';
        button.disabled = false;
    }

    function showSuccess() {
        // Crear mensaje de éxito
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: bold;
        `;
        successMessage.textContent = '✓ Pago procesado exitosamente!';
        
        document.body.appendChild(successMessage);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
        
        // Resetear formulario
        paymentForm.reset();
        cardNumberDisplay.textContent = '1722 2646 0312 1234';
        expiryDisplay.textContent = '12/25';
        cardholderDisplay.textContent = 'Mrs Kate Smith';
        clearErrors();
    }

    // Efectos de enfoque en los inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
});