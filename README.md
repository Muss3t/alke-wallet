# Alke Wallet

![Estado](https://img.shields.io/badge/Estado-Finalizado-success)
![Versión](https://img.shields.io/badge/Versi%C3%B3n-1.0-blue)

Proyecto Front-end correspondiente al Módulo 2 del Bootcamp de Desarrollo Web. 
Alke Wallet es la maqueta funcional de una billetera digital interactiva, diseñada para ofrecer a los usuarios una interfaz segura, moderna y fácil de utilizar para la administración de sus activos financieros.

## Demostración en Vivo
Prueba la funcionalidad del proyecto aquí:
**[Ver Alke Wallet en GitHub Pages](https://muss3t.github.io/alke-wallet/)**

### Características Principales
El proyecto simula el flujo completo de un usuario dentro de una aplicación financiera:
* **Inicio de Sesión:** Validación básica de credenciales (correo y contraseña).
* **Dashboard / Menú Principal:** Visualización en tiempo real del saldo disponible y accesos rápidos a las operaciones.
* **Depósitos:** Ingreso de fondos con actualización automática del balance general.
* **Transferencias:** Envío de dinero con validación de saldo insuficiente, uso de autocompletado para buscar contactos y un modal interactivo para guardar contactos nuevos.
* **Historial de Movimientos:** Registro dinámico de todas las transacciones (ingresos y egresos) con un formato visual claro.

#### Tecnologías Utilizadas
* **HTML5:** Estructura semántica de las vistas.
* **CSS3:** Estilos personalizados, diseño fluido e implementación de estética Neomorfismo/Fintech.
* **JavaScript (ES6):** Lógica de validaciones, manipulación del LocalStorage para persistencia de datos de sesión y cálculos matemáticos de saldo.
* **Bootstrap 5:** Sistema de grillas responsivo, tarjetas, botones y componentes Modales.
* **jQuery & jQuery UI:** Manipulación ágil del DOM, animaciones de entrada (`fadeIn`) y función de autocompletado de contactos.

##### Arquitectura del Proyecto
El código está estructurado bajo principios de modularidad y DRY (Don't Repeat Yourself), separando la lógica y los estilos específicos de cada vista para facilitar su escalabilidad:

```text
alke-wallet/
├── css/
│   ├── deposit.css
│   ├── global.css        # Estilos compartidos (navbar, botones, tipografía)
│   ├── login.css
│   ├── menu.css          # Estilos específicos del dashboard
│   ├── sendmoney.css
│   └── transactions.css
├── js/
│   ├── deposit.js
│   ├── global.js         # Funciones compartidas (verificación de sesión, formateo de saldo)
│   ├── login.js
│   ├── menu.js
│   ├── sendmoney.js
│   └── transactions.js
├── index.html
├── login.html
├── menu.html
├── deposit.html
├── sendmoney.html
├── transactions.html
└── README.md

✒️ Autor
Kisi Toledo
