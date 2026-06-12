$(document).ready(function () {
    verificarSesion();
    actualizarSaldoEnPantalla();

    $('#depositForm').on('submit', function (e) {
        e.preventDefault();
        const montoDeposito = parseFloat($('#depositAmount').val());
        const saldoActual = parseFloat(localStorage.getItem('alkeBalance'));

        if (montoDeposito <= 0 || isNaN(montoDeposito)) {
            mostrarMensaje('Ingresa un monto válido mayor a 0.', 'warning');
        } else {
            localStorage.setItem('alkeBalance', saldoActual + montoDeposito);
            actualizarSaldoEnPantalla();
            registrarMovimiento('Ingreso', 'Depósito en cuenta', montoDeposito);
            mostrarMensaje(`Has depositado $${montoDeposito.toLocaleString('es-CL')} exitosamente.`, 'success');
            $('#depositForm')[0].reset();
        }
    });
});