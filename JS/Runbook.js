//DECLARACIONES DE VARIABLES Y OBJETOS
var cliente = "VyM";
//var usuariored = document.querySelector('#reduser');
var ms365mail = document.querySelector('#o365mail');
var altermail = document.querySelector('#personalmail');
var cod = document.querySelector('#cod');
var pass = document.querySelector('#pass');
var repass = document.querySelector('#repass');
var view = document.querySelector('#view');
var visto = document.querySelector('#visto');
view.style.visibility = 'visible';
vcap.style.visibility = 'hidden';
visto.style.visibility = 'hidden';

//Captcha
function enableBtn(){
	visto.style.visibility = 'visible';
}

//JSON Function
function sendCode(){
               
	// Creating a XHR object
	let xhr = new XMLHttpRequest();
	let url = "https://prod-172.westus.logic.azure.com:443/workflows/f208414e5c2c4a9a983af31ad912604c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HKUWVhGRYSP28Nt7bXOu0FRDxBVkkN-BjN0tfRhjEOU";

	// open a connection
	xhr.open("POST", url, true);

	// Set the request header i.e. which type of content you are sending
	xhr.setRequestHeader("Content-Type", "application/json");

	// Create a state change callback
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			console.log(json.email + ", " + json.password);
		}
	};

	// Converting JSON data to string
	var data = JSON.stringify({"customer":cliente, "o365mail": ms365mail.value, "personalmail": altermail.value});



	// Sending data with the request
	xhr.send(data);
	//Habilitar codigo
	cod.disabled=false;
	pass.disabled=false;
	repass.disabled=false;
	view.style.visibility = 'hidden';
	vcap.style.visibility = 'visible';
	//visto.style.visibility = 'visible';

}
//Cambiar contraseña
function changePass(){

               
	// Creating a XHR object
	let xhr = new XMLHttpRequest();
	let url = "https://prod-52.westus.logic.azure.com:443/workflows/573911f307d54a9eb274f8ef6637b932/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=X4H-QF6-hjd4vsoohkNYB1JVBpH9Ipj-xPVrpOb25gk";

 
    // Verificamos si las constraseñas no coinciden 
    if (pass.value != repass.value) {
 
        // Si las constraseñas no coinciden mostramos un mensaje 
        document.getElementById("error").classList.add("mostrar");
 
        return false;
    } else {
 
        // Si las contraseñas coinciden ocultamos el mensaje de error
        document.getElementById("error").classList.remove("mostrar");

			// open a connection
	xhr.open("POST", url, true);

	// Set the request header i.e. which type of content you are sending
	xhr.setRequestHeader("Content-Type", "application/json");

	// Create a state change callback
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			console.log(json.email + ", " + json.password);
		}
	};

	// Converting JSON data to string
	var data = JSON.stringify({ "codigo":cod.value, "customer":cliente, "o365mail": ms365mail.value, "personalmail": altermail.value, "Pass":pass.value });
 
        // Sending data with the request
		xhr.send(data);
		//Habilitar codigo
		cod.disabled=true;
		pass.disabled=true;
		repass.disabled=true;
		visto.style.visibility = 'hidden';

		document.getElementById('client').value = ''
		document.getElementById('reduser').value = ''
		document.getElementById('o365mail').value = ''
		document.getElementById('personalmail').value = ''
		document.getElementById('cod').value = ''
		document.getElementById('pass').value = ''
		document.getElementById('repass').value = ''
 
        // Refrescamos la página (Simulación de envío del formulario) 
        setTimeout(function() {
            location.reload();
        }, 2000);
 
        return true;
    }

}