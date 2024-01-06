window.onload = function() {
    // Al cargar la página, cargar ítems y configurar el evento de cambio para el menú desplegable
    loadItems();
    document.getElementById('item').addEventListener('change', loadPrice);

    // Configurar el evento de clic para el botón de "Agregar Nuevo Item"
    document.getElementById('openModalBtn').addEventListener('click', promptAddNewItem);

    document.getElementById('deleteItemBtn').addEventListener('click', deleteSelectedItem);

};

var today = new Date();

// Formatear la fecha como "YYYY-MM-DD" (puedes ajustar el formato según tus preferencias)
var date = today();

// Actualizar el contenido de la etiqueta span con el ID "fechaActual"
document.getElementById('fecha').textContent = date;



// Agrega este código en tu archivo JavaScript

function calculateTotal(element) {
    let container = element.parentElement;
    let unitsFilatabla = parseFloat(container.querySelector('.units').value) || 0;
    let priceFilatabla = parseFloat(container.querySelector('.price').value) || 0;
    let totalFilatabla = (unitsFilatabla * priceFilatabla).toFixed(2); // Formatea el número con dos decimales
    container.querySelector('.total').value = totalFilatabla;

    // Llama a calculateSubTotal después de actualizar el campo "Total"
    calculateSubTotal();
    calculateFinalTotal();
}


function calculateSubTotal() {
    console.log('calculateSubTotal called');
    let totalElements = document.querySelectorAll('.filatabla .total');
    let subTotal = Array.from(totalElements).reduce((acc, element) => {
        let parsedValue = parseFloat(element.value);
        console.log('Parsed Value:', parsedValue);
        return acc + (parsedValue || 0);
    }, 0);

    // Actualiza el valor del input con ID "subTotal"
    document.getElementById('subTotal').value = subTotal.toFixed(2);
}

let totalElements = document.querySelectorAll('.filatabla .total');

totalElements.forEach(function (element) {
    element.addEventListener('input', calculateSubTotal);
});

// Agrega eventos 'input' a los campos "Units" y "Price"
let unitsElements = document.querySelectorAll('.filatabla .units');
let priceElements = document.querySelectorAll('.filatabla .price');

unitsElements.forEach(function (element) {
    element.addEventListener('input', calculateSubTotal);
});

priceElements.forEach(function (element) {
    element.addEventListener('input', calculateSubTotal);
});

// Llama a calculateSubTotal al cargar la página
calculateSubTotal();


///////////////////////////////


// Función para calcular el descuento y actualizar el subtotal
function calculateFinalTotal() {
    // Obtén el valor del descuento, impuestos y envío
    let discount = parseFloat(document.getElementById('discount').value) || 0;
    let taxes = parseFloat(document.getElementById('taxes').value) || 0;
    let shipping = parseFloat(document.getElementById('shipping').value) || 0;

    // Obtiene el subtotal
    let subTotal = parseFloat(document.getElementById('subTotal').value) || 0;

    // Calcula el descuento aplicando el porcentaje al subtotal
    let discountAmount = (subTotal * (discount / 100));

    // Calcula el total antes de impuestos y envío
    let totalBeforeTaxAndShipping = subTotal - discountAmount;

    // Calcula el total con impuestos y envío
    let finalTotal = totalBeforeTaxAndShipping + taxes + shipping;

    // Actualiza el valor del elemento con ID "finalTotal"
    document.getElementById('finalTotal').innerText = finalTotal.toFixed(2);
}

// Llama a calculateFinalTotal al cargar la página para asegurar la coherencia inicial
calculateFinalTotal();
