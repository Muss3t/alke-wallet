$(document).ready(function () {
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
                    <td class="text-end fw-bold ${colorMonto}">${signo}$${movimiento.monto.toLocaleString('es-CL')}</td>
                </tr>
            `;
            tbody.append(fila);
        });
    }
});