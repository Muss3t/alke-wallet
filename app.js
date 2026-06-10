// app.js

// 1. Configuración Inicial en LocalStorage
if (!localStorage.getItem('alkeBalance')) {
    localStorage.setItem('alkeBalance', 150000); // Saldo inicial: $150,000
}
if (!localStorage.getItem('alkeHistory')) {
    localStorage.setItem('alkeHistory', JSON.stringify([])); // Historial vacío
}

$(document).ready(function () {

    // --- LOGICA DE LOGIN (login.html) ---
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();

        if (email && password.length >= 6) {
            localStorage.setItem('isLogged', 'true');
            window.location.href = 'menu.html';
        } else {
            alert("Por favor, ingresa credenciales válidas.");
        }
    });

    // Cerrar sesión
    $('#logoutBtn').on('click', function() {
        localStorage.removeItem('isLogged');
        window.location.href = 'login.html';
    });

    // --- ANIMACIONES GENERALES ---
    $('.fade-in-section').fadeIn(800);

    // --- LOGICA DEL MENU (menu.html) ---
    if (window.location.pathname.includes('menu.html')) {
        verificarSesion();
        actualizarSaldoEnPantalla();
    }

    // --- LOGICA DE ENVIO DE DINERO (sendmoney.html) ---
    if (window.location.pathname.includes('sendmoney.html')) {
        verificarSesion();
        actualizarSaldoEnPantalla();

        const contactos = [
            "Juan Pérez", "María González", "Carlos López", 
            "Ana Torres", "Roberto Gómez", "Luisa Fernández"
        ];
        
        $("#contact").autocomplete({ source: contactos });

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
                const nuevoSaldo = saldoActual - monto;
                localStorage.setItem('alkeBalance', nuevoSaldo);
                actualizarSaldoEnPantalla();
                
                // AQUÍ GUARDAMOS EL MOVIMIENTO
                registrarMovimiento('Egreso', 'Transferencia a ' + contacto, monto);
                
                mostrarMensaje(`Transferencia de $${monto.toLocaleString('es-CL')} enviada a ${contacto}.`, 'success');
                $('#sendForm')[0].reset();
            }
        });
    }

    // --- LOGICA DE DEPOSITO (deposit.html) ---
    if (window.location.pathname.includes('deposit.html')) {
        verificarSesion();
        actualizarSaldoEnPantalla();

        $('#depositForm').on('submit', function (e) {
            e.preventDefault();
            
            const montoDeposito = parseFloat($('#depositAmount').val());
            const saldoActual = parseFloat(localStorage.getItem('alkeBalance'));

            if (montoDeposito <= 0 || isNaN(montoDeposito)) {
                mostrarMensaje('Ingresa un monto válido mayor a 0.', 'warning');
            } else {
                const nuevoSaldo = saldoActual + montoDeposito;
                localStorage.setItem('alkeBalance', nuevoSaldo);
                actualizarSaldoEnPantalla();
                
                // AQUÍ GUARDAMOS EL MOVIMIENTO
                registrarMovimiento('Ingreso', 'Depósito en cuenta', montoDeposito);
                
                mostrarMensaje(`Has depositado $${montoDeposito.toLocaleString('es-CL')} exitosamente.`, 'success');
                $('#depositForm')[0].reset();
            }
        });
    }

    // --- LOGICA DE HISTORIAL (transactions.html) ---
    if (window.location.pathname.includes('transactions.html')) {
        verificarSesion();
        
        const historial = JSON.parse(localStorage.getItem('alkeHistory'));
        const tbody = $('#tablaMovimientos');

        if (historial.length === 0) {
            $('#mensajeSinMovimientos').show();
        } else {
            historial.forEach(movimiento => {
                const colorMonto = movimiento.tipo === 'Ingreso' ? 'text-success' : 'text-danger';
                const signo = movimiento.tipo === 'Ingreso' ? '+' : '-';
                
                const fila = `
                    <tr>
                        <td>${movimiento.fecha}</td>
                        <td><span class="badge ${movimiento.tipo === 'Ingreso' ? 'bg-success' : 'bg-dark'}">${movimiento.tipo}</span></td>
                        <td>${movimiento.detalle}</td>
                        <td class="text-end fw-bold ${colorMonto}">
                            ${signo}$${movimiento.monto.toLocaleString('es-CL')}
                        </td>
                    </tr>
                `;
                tbody.append(fila);
            });
        }
    }

    // ==========================================
    // FUNCIONES AUXILIARES
    // ==========================================
    
    function registrarMovimiento(tipo, detalle, monto) {
        const historial = JSON.parse(localStorage.getItem('alkeHistory'));
        const fecha = new Date().toLocaleDateString('es-CL', { hour: '2-digit', minute: '2-digit' });
        
        historial.unshift({ fecha, tipo, detalle, monto }); 
        localStorage.setItem('alkeHistory', JSON.stringify(historial));
    }

    function actualizarSaldoEnPantalla() {
        const saldoFormat = parseFloat(localStorage.getItem('alkeBalance')).toLocaleString('es-CL');
        $('#saldoActual').text('$' + saldoFormat);
        $('#saldoTransferencia').text('$' + saldoFormat);
    }

    function mostrarMensaje(texto, tipo) {
        const cajaMensaje = $('#transferMessage');
        cajaMensaje.removeClass().addClass(`mt-3 text-center alert alert-${tipo}`);
        cajaMensaje.text(texto).slideDown().delay(3000).slideUp();
    }

    function verificarSesion() {
        if (!localStorage.getItem('isLogged')) {
            window.location.href = 'login.html';
        }
    }
});