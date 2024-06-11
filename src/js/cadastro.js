document.addEventListener('DOMContentLoaded', () => {



    const button = document.getElementById('cadastro');

    button.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const nomeUsuario = document.getElementById('nomeUsuario').value;
        const senha = document.getElementById('senha').value;

        let mensagemErro = '';

        if (email === '') {
            mensagemErro += 'Email está vazio.\n';
        }
        if (nomeUsuario === '') {
            mensagemErro += 'Nome de Usuário está vazio.\n';
        }
        if (senha === '') {
            mensagemErro += 'Senha está vazia.\n';
        }

        if (mensagemErro !== '') {
            alert(mensagemErro);
        } else {
            const user = {
                email,
                nomeUsuario,
                senha
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