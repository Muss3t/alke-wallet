$(document).ready(function () {
    verificarSesion();
    actualizarSaldoEnPantalla();

    // 1. contactos en una variable dinámica
    let contactos = ["Juan Pérez", "María González", "Carlos López", "Ana Torres", "Roberto Gómez", "Luisa Fernández"];

    function iniciarAutocomplete() {
        $("#contact").autocomplete({ source: contactos });
    }
    iniciarAutocomplete();

    // 2. EVENTO: Agregar nuevo contacto
    $('#btnSaveContact').on('click', function() {
        const nuevoNombre = $('#newContactName').val();

        if (nuevoNombre.trim() !== "") {
            contactos.push(nuevoNombre); // Guarda el nuevo contacto
            iniciarAutocomplete(); // Refresca el autocompletado
            $('#newContactName').val(''); // Limpia el input

            // Oculta el Modal usando Bootstrap
            const modalEl = document.getElementById('addContactModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();

            mostrarMensaje(`Contacto "${nuevoNombre}" agregado a tu agenda.`, 'success');
        } else {
            alert("Por favor, ingresa un nombre válido.");
        }
    });

    // 3. EVENTO: Enviar dinero
    $('#sendForm').on('submit', function (e) {
        e.preventDefault();
        const monto = parseFloat($('#amount').val());
        const saldoActual = parseFloat(localStorage.getItem('alkeBalance'));
        const contacto = $('#contact').val();

        if (monto > saldoActual) {
            mostrarMensaje('Saldo insuficiente para esta transacción.', 'danger');
        } else if (monto <= 0 || isNaN(monto)) {
            mostrarMensaje('El monto debe ser mayor a 0.', 'warning');
        } else {
            localStorage.setItem('alkeBalance', saldoActual - monto);
            actualizarSaldoEnPantalla();
            registrarMovimiento('Egreso', 'Transferencia a ' + contacto, monto);
            mostrarMensaje(`Transferencia de $${monto.toLocaleString('es-CL')} enviada a ${contacto}.`, 'success');
            $('#sendForm')[0].reset();
        }
    });
});