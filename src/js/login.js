
const button = document.getElementById('login');

async function validarLogin(){
    const nome = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;


    if(nome === '' || senha === ''){
        console.log('aaaaaaaaaa')

        alert('Preencha os Campos Corretamente...')
    } else {

        const users = await fetch('http://localhost:8080/v1/lavarapido/clientes')
        const listUsers = await users.json()

        listUsers.forEach((user) => {
            console.log(email)
            console.log(senha)
            console.log(user.email)
            console.log(user.senha)

            

            if(email === user.email && senha === user.senha ){
                alert('Usuário Logado com Sucesso !!!')
                window.location.href = './home.html'
            }
        })

    }

}


button.addEventListener('click', validarLogin )
window.onload = () => {
    // button.addEventListener('click', validarLogin)
    
}