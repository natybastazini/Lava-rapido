document.addEventListener('DOMContentLoaded', () => {



    const button = document.getElementById('cadastro');

    button.addEventListener('click', () => {
        const nomeUsuario = document.getElementById('nome').value;
        const dataNascimento = document.getElementById('datanascimento').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;

        let mensagemErro = '';

        if (email === '') {
            mensagemErro += 'Email está vazio.\n';
        }
        if (nomeUsuario === '') {
            mensagemErro += 'Nome de Usuário está vazio.\n';
        }
        if (dataNascimento === '') {
            mensagemErro += 'Data nascimento está vazia.\n';
        }
        if (telefone === '') {
            mensagemErro += 'telefone está vazia.\n';
        }
        if (mensagemErro !== '') {
            alert(mensagemErro);
        } else {
            const user = {
                email,
                nomeUsuario,
                telefone,
                dataNascimento
            };

            const url = 'http://localhost:8080/v1/lavarapido/insertcliente';

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            };

            fetch(url, options)
                .then(response => {
                    if (response.ok) {
                        alert('Usuário Cadastrado');
                    } else {
                        alert('Erro ao cadastrar usuário');
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao cadastrar usuário');
                })


        }
    })
})

window.onload = () => {
    button.addEventListener('click', validarLogin)
}