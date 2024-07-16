document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.seccion-card');

    cards.forEach(card => {
        const resetBtn = card.querySelector('#resetBtn2');
        resetBtn.style.display = 'none'; // Ocultar el botón resetBtn2 inicialmente

        card.addEventListener('click', function() {
            if (!card.classList.contains('expanded')) {
                cards.forEach(otherCard => {
                    if (otherCard !== card && !otherCard.classList.contains('expanded')) {
                        otherCard.classList.add('hidden');
                    }
                });
            }

            card.classList.toggle('expanded');
            resetBtn.style.display = card.classList.contains('expanded') ? 'inline' : 'none';
        });

        resetBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // Evitar que el clic en el botón propague al contenedor

            // Deshacer la expansión de la tarjeta actual
            card.classList.remove('expanded');

            // Mostrar todas las tarjetas nuevamente
            cards.forEach(otherCard => {
                otherCard.classList.remove('hidden');
            });

            // Ocultar el botón resetBtn2
            resetBtn.style.display = 'none';
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.seccion-card');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const resetBtn = card.querySelector('#resetBtn2');
            if (resetBtn) {
                resetBtn.style.display = 'inline'; // Mostrar el botón resetBtn2
            }
        });
    });
});


function mostrarDetalles(id) {
    var detallesCurso = document.getElementById(id + "-detalles");
    detallesCurso.style.display = detallesCurso.style.display === "none" ? "block" : "none";
}

document.addEventListener('DOMContentLoaded', function() {
    const cursoItems = document.querySelectorAll('.curso-item');

    cursoItems.forEach(item => {
        const header = item.querySelector('.curso-header');
        const details = item.querySelector('.curso-details');

        header.addEventListener('click', function() {
            details.classList.toggle('expanded');
        });
    });
});

