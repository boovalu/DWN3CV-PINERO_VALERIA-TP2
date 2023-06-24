// Chequeo si el browser soport Service Worker
if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('../serviceworker.js').then((message)=>{
        console.log('Service worker esta OK y en acción!');
    })
} else { // no soporta Service worker el browser
    alert('Este browser no soporta Service Worker');
}