var budgetButton = document.getElementById("submit");
var form = document.getElementById("form");

// LISTENER PARA EL BOTÓN DE ENVIAR
budgetButton.addEventListener("click", (e)=>{
    e.preventDefault();

    valido = validation();

    if (valido == true){
        form.submit();
    }
})

// FUNCION DE VALIDACION DE FORMULARIO
function validation(){

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;


    if (name == "" || name == null){
        alert("Por favor, introduce tu nombre");
        return false;
    }
    const nameRe = /^[a-zA-ZÀ-ÿ\s ]{1,50}$/;
    if (!nameRe.exec(name)){
        alert("El nombre solo puede contener letras");
        return false;
    } 

    if (email == "" || email == null){
        alert("Por favor, introduce tu email");
        return false;
    } 
    const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRe.exec(email)){
        alert("El formato del email no es correcto");
        return false;
    }

    if (phone == "" || phone == null){
        alert("Por favor, introduce tu número de teléfono");
        return false;
    }
    const phoneRe = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;
    if (!phoneRe.exec(phone)){
        alert("El formato del número de teléfono no es correcto");
        return false;
    }

}


//*******************************************************************FORMULARIO DINAMICO**********************************************************//

const productsSeleccion = document.getElementById("products");
const plazo = document.getElementById("plazo");
const serviciosAdicionales = document.querySelectorAll(".checkboxes>input[type='checkbox']");
const estimadoInput = document.getElementById("estimado");
var precio = 0;

productsSeleccion.addEventListener("change", ()=>{
    const selectedOption = productsSeleccion.options[productsSeleccion.selectedIndex]
    const valorSeleccionado = selectedOption.value;

    if(!valorSeleccionado){
        alert("Por favor, selecciona un producto");
        return
    }

    const [nombreProducto, precioProducto] = valorSeleccionado.split(":");
    precio = parseFloat(precioProducto);
    estimadoInput.value = precio + " €";
    calculoDescuento();
});

plazo.addEventListener("change", calculoDescuento);

    serviciosAdicionales.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const [nombreAdicional, precioAdicional] = checkbox.value.split(":");
        var precioAdicionalNum = parseFloat(precioAdicional);
        console.log(precioAdicionalNum);
        if (checkbox.checked) {
            precio += precioAdicionalNum;
            estimadoInput.value = precio + " €";
        } else {
            precio -= precioAdicionalNum;
            estimadoInput.value = precio + " €";
        }
        calculoDescuento();
    })
});

function calculoDescuento(){
    if (plazo.value < 0){
        plazo.value = 0;
    }
    const descuentoMaximo = 0.2;
    var descuento = plazo.value*0.01;  
    if (descuento > descuentoMaximo){ 
        descuento = descuentoMaximo
    }
    var valorDescontado = parseFloat(precio - (precio * descuento));
    estimadoInput.value = valorDescontado + " €";
}