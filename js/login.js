$(document).ready(function () {
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
});