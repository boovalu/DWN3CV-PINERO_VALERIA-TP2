const status_element = document.getElementById('status');

// browser no tiene conexion = estado offline
window.addEventListener('offline', event => {
    status_element.innerHTML = '¡No tenes conexión!';
	
});

// browser esta conectado nuevamente = estado online
window.addEventListener('online', event => {
    status_element.innerHTML = 'Estas online!';
});

//
if ( !navigator.onLine ){
    status_element.innerHTML = '¡Estamos sin conexion!';
    console.log('¡Estamos sin conexion!');
}
