// Configuración Inicial en LocalStorage
if (!localStorage.getItem('alkeBalance')) { localStorage.setItem('alkeBalance', 150000); }
if (!localStorage.getItem('alkeHistory')) { localStorage.setItem('alkeHistory', JSON.stringify([])); }

function verificarSesion() {
    if (!localStorage.getItem('isLogged')) { window.location.href = 'login.html'; }
}

function actualizarSaldoEnPantalla() {
    if ($('#saldoActual').length || $('#saldoTransferencia').length) {
        const saldoFormat = parseFloat(localStorage.getItem('alkeBalance')).toLocaleString('es-CL');
        $('#saldoActual').text('$' + saldoFormat);
        $('#saldoTransferencia').text('$' + saldoFormat);
    }
}

function mostrarMensaje(texto, tipo) {
    const cajaMensaje = $('#transferMessage');
    cajaMensaje.removeClass().addClass(`mt-3 text-center alert alert-${tipo}`);
    cajaMensaje.text(texto).slideDown().delay(3000).slideUp();
}

function registrarMovimiento(tipo, detalle, monto) {
    const historial = JSON.parse(localStorage.getItem('alkeHistory'));
    const fecha = new Date().toLocaleDateString('es-CL', { hour: '2-digit', minute: '2-digit' });
    historial.unshift({ fecha, tipo, detalle, monto }); 
    localStorage.setItem('alkeHistory', JSON.stringify(historial));
}

// Animaciones base y Cerrar Sesión
$(document).ready(function () {
    $('.fade-in-section').fadeIn(800);
    $('#logoutBtn').on('click', function() {
        localStorage.removeItem('isLogged');
        window.location.href = 'login.html';
    });
});