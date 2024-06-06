// JavaScript para carregar a imagem selecionada e exibi-la na página
function loadFile(event) {
    const image = document.getElementById('profile-image');
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            image.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
}

// JavaScript para desabilitar campos do formulário após a submissão
const form = document.getElementById('profile-form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a submissão padrão do formulário

    // Desabilita todos os campos do formulário
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.disabled = true;
    });

    // Desabilita o botão de submissão
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
});

// JavaScript para permitir que o usuário edite novamente o perfil
const editarPerfilButton = document.getElementById('editarPerfil');
editarPerfilButton.addEventListener('click', function(event) {
    event.preventDefault(); // Evita a submissão padrão do formulário

    // Habilita todos os campos do formulário
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.disabled = false;
    });

    // Habilita o botão de submissão
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = false;
});
