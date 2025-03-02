document.addEventListener("DOMContentLoaded", () => {
  // Selecciona la pantalla donde se mostrarán los números y el resultado
  const pantalla = document.getElementById("pantalla");
  // Selecciona todos los botones de la calculadora
  const botones = document.querySelectorAll("button");

  // Variables para almacenar los valores y la operación actual
  let valorActual = "";
  let valorAnterior = "";
  let operador = "";

  // Función para sumar dos números
  function sumar(a, b) {
    return a + b;
  }

  // Función para restar dos números
  function restar(a, b) {
    return a - b;
  }

  // Función para multiplicar dos números
  function multiplicar(a, b) {
    return a * b;
  }

  // Función para dividir dos números, evitando la división por 0
  function dividir(a, b) {
    return b !== 0 ? a / b : "Error";
  }

  // Función para realizar el cálculo según el operador seleccionado
  function calcular() {
    const num1 = parseFloat(valorAnterior); // Convierte el primer número a tipo número
    const num2 = parseFloat(valorActual); // Convierte el segundo número a tipo número
    let resultado;

    // Verifica qué operación debe realizarse
    switch (operador) {
      case "+":
        resultado = sumar(num1, num2);
        break;
      case "-":
        resultado = restar(num1, num2);
        break;
      case "*":
        resultado = multiplicar(num1, num2);
        break;
      case "/":
        resultado = dividir(num1, num2);
        break;
      default:
        return;
    }
    // Muestra el resultado en la pantalla
    pantalla.value = resultado;
    // Guarda el resultado como el nuevo valor anterior y limpia el actual
    valorAnterior = resultado.toString();
    valorActual = "";
    operador = "";
  }

  // Asigna eventos a los botones
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = boton.id; // Obtiene el ID del botón
      const textoBoton = boton.textContent; // Obtiene el texto del botón

      if (boton.classList.contains("num")) {
        // Si es un número
        valorActual += textoBoton;
        pantalla.value = valorActual;
      } else if (id === "C") {
        // Si es el botón de limpiar
        valorActual = "";
        valorAnterior = "";
        operador = "";
        pantalla.value = "";
      } else if (id === "borrar") {
        // Si es el botón de borrar un solo dígito
        valorActual = valorActual.slice(0, -1);
        pantalla.value = valorActual;
      } else if (id === "igual") {
        // Si es el botón de igual
        if (valorAnterior && valorActual && operador) {
          calcular();
        }
      } else {
        // Si es un operador (+, -, *, /)
        if (valorActual) {
          if (valorAnterior) {
            // Si ya hay una operación pendiente, calcular antes
            calcular();
          }
          valorAnterior = valorActual;
          valorActual = "";
          operador = textoBoton;
        }
      }
    });
  });
});
