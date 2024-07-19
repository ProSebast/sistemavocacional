document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('startButton');
    const testForm = document.getElementById('testForm');
    const prevButton = document.querySelector('.prevButton');
    const nextButton = document.querySelector('.nextButton');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.getElementById('progress-bar');
    const vocacContent = document.querySelector('.vocac-content');
    const preguntas = document.querySelectorAll('.pregunta');
    const resultadoContainer = document.getElementById('resultado-container');
    const resultado = document.getElementById('resultado');
    const totalPreguntas = preguntas.length;
    
    

    let currentPregunta = 0;
    let respuestas = {}; // Objeto para almacenar las respuestas

    // Ocultar el botón "Siguiente" al principio
    nextButton.style.display = 'none';

    // Función para mostrar la pregunta actual
    function showPregunta(index) {
        preguntas.forEach((pregunta, idx) => {
            if (idx === index) {
                pregunta.style.display = 'block';
            } else {
                pregunta.style.display = 'none';
            }
        });
        updateProgressBar(); // Actualizar la barra de progreso al mostrar la pregunta
        updateButtons();     // Actualizar visibilidad de botones
    }

    // Función para actualizar la barra de progreso
    function updateProgressBar() {
        const progress = ((currentPregunta + 1) / totalPreguntas) * 100;
        document.getElementById('progress').style.width = progress + '%';
    }

    // Función para actualizar la visibilidad de botones
    function updateButtons() {
        // Mostrar el botón "Siguiente" y ocultar "Anterior" en la primera pregunta
        if (currentPregunta === 0) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'inline';
        } else {
            prevButton.style.display = 'inline';
        }

        // Mostrar el botón "Enviar" en lugar de "Siguiente" en la última pregunta
        if (currentPregunta === totalPreguntas - 1) {
            nextButton.style.display = 'none';
            submitBtn.style.display = 'inline';
        } else {
            submitBtn.style.display = 'none';
            nextButton.style.display = 'inline';
        }
    }

    // Validar si la pregunta actual tiene al menos una respuesta marcada
    function isPreguntaRespondida(index) {
        const checkboxes = preguntas[index].querySelectorAll('input[type="checkbox"]');
        for (let checkbox of checkboxes) {
            if (checkbox.checked) {
                return true;
            }
        }
        return false;
    }

    // Guardar las respuestas marcadas
    function saveRespuestas(index) {
        const checkboxes = preguntas[index].querySelectorAll('input[type="checkbox"]');
        let seleccionadas = [];
        checkboxes.forEach((checkbox, idx) => {
            if (checkbox.checked) {
                seleccionadas.push(checkbox.value);
            }
        });
        respuestas[index] = seleccionadas;
    }

    // Asegurar que solo una opción esté marcada por pregunta
    preguntas.forEach(pregunta => {
        const checkboxes = pregunta.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    checkboxes.forEach(cb => {
                        if (cb !== checkbox) {
                            cb.checked = false;
                        }
                    });
                }
                // Guardar la respuesta cada vez que se cambie
                saveRespuestas(currentPregunta);
            });
        });
    });

    // Evento de clic para el botón de inicio
    startButton.addEventListener('click', function() {
        startButton.style.display = 'none'; // Ocultar el botón de inicio
        progressBar.style.display = 'block'; // Mostrar la barra de progreso
        testForm.style.display = 'block'; 
        resultadoContainer.style.display = 'none' ; // Mostrar el formulario de preguntas
        vocacContent.style.alignItems = 'flex-start'; // Cambiar la alineación al inicio
        vocacContent.style.paddingLeft = '10%'; // Añadir padding izquierdo

        // Mostrar la primera pregunta
        showPregunta(currentPregunta);

        // Mostrar el botón "Siguiente"
        nextButton.style.display = 'inline';
    });

    // Evento de clic para el botón "Siguiente"
    nextButton.addEventListener('click', function() {
        const errorMessage = preguntas[currentPregunta].querySelector('.error-message');
        if (currentPregunta < preguntas.length - 1) {
            if (isPreguntaRespondida(currentPregunta)) {
                currentPregunta++;
                showPregunta(currentPregunta);
                errorMessage.style.display = 'none';
            } else {
                errorMessage.style.display = 'inline';
            }
        }
    });

    // Evento de clic para el botón "Anterior"
    prevButton.addEventListener('click', function() {
        if (currentPregunta > 0) {
            currentPregunta--;
            showPregunta(currentPregunta);
            const errorMessage = preguntas[currentPregunta].querySelector('.error-message');
            errorMessage.style.display = 'none';
        }
    });

    // Evento de clic para el botón "Enviar"
    submitBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        if (isPreguntaRespondida(currentPregunta)) {
            // Ocultar el formulario de preguntas y mostrar el contenedor de resultados
            testForm.submit(); // Enviar el formulario
        } else {
            const errorMessage = preguntas[currentPregunta].querySelector('.error-message');
            errorMessage.style.display = 'inline';
        }
    });
});





document.addEventListener('DOMContentLoaded', function() {
    var resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', function() {
        // Ocultar el resultado anterior
        var resultado = document.getElementById('resultado-container');
        if (resultado) {
            resultado.style.display = 'none';
        }

        // Reiniciar el formulario
        var form = document.getElementById('testForm');
        form.reset();

        // Enviar el formulario al principio
        form.submit();
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#testForm');
    const resultadoContainer = document.getElementById('resultado-container');
    const startButton = document.getElementById('startButton');

    // Verificar si ya se ha respondido la encuesta
    if (resultadoContainer && resultadoContainer.querySelector('#resultado').textContent.trim() !== '') {
        resultadoContainer.style.display = 'block'; // Mostrar el contenedor si ya hay resultados
        startButton.textContent = 'Reintentar'; // Cambiar el texto del botón a "Reintentar"
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(form);
            
            fetch('/testvocacional/', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Manejar la respuesta del servidor
                if (data.resultado) {
                    document.getElementById('resultado').textContent = data.resultado;
                    resultadoContainer.style.display = 'block'; // Mostrar el contenedor de resultados
                    startButton.textContent = 'Reintentar test'; // Cambiar el texto del botón a "Reintentar"
                } else if (data.error_message) {
                    alert(data.error_message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.');
            });
        });
    }

    // Manejar el evento de reinicio del formulario
    if (startButton) {
        startButton.addEventListener('click', function(event) {
            event.preventDefault();
            form.reset(); // Reiniciar el formulario
            resultadoContainer.style.display = 'none'; // Ocultar el contenedor de resultados
        });
    }
});










