document.addEventListener('DOMContentLoaded', function() {
    // Manejar el clic en el botón de editar
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            let alumnoId = this.getAttribute('data-id');
            let row = this.closest('tr');
            let eva1Input = row.querySelector('input[name="eva1_' + alumnoId + '"]');
            let eva2Input = row.querySelector('input[name="eva2_' + alumnoId + '"]');
            let eva3Input = row.querySelector('input[name="eva3_' + alumnoId + '"]');
            
            // Habilitar los campos de entrada
            eva1Input.removeAttribute('readonly');
            eva2Input.removeAttribute('readonly');
            eva3Input.removeAttribute('readonly');
            
            // Cambiar el botón de editar a "Guardar" para que el usuario pueda guardar los cambios
            this.textContent = 'Guardar';
            this.classList.remove('btn-secondary');
            this.classList.add('btn-primary');
            this.classList.add('save-button'); // Añadir una clase para identificar el botón de guardar

            // Manejar el clic en el botón de guardar
            this.addEventListener('click', function() {
                // Aquí puedes implementar la lógica para enviar los datos modificados al servidor
                // Enviar los datos usando fetch o un formulario
                let form = document.querySelector('form');
                form.submit(); // Envía el formulario con los datos modificados
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('El archivo JavaScript está funcionando correctamente.');
});