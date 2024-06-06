// funções de serviços

export async function getServicos() {

    const url = `http://localhost:8080/v1/lavarapido/servicos` 
    const response = await fetch(url)
    const data = await response.json()
    return data.servicos    
}

export async function getServico(id) {
    const url = `http://localhost:8080/v1/lavarapido/servico/${id}`
    const response = await fetch(url)
    const data = await response.json()
    return data.servicos[0]
}