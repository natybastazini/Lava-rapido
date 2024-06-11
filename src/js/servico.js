
import { getServico } from "./funcoes.js"

const servicoId = localStorage.getItem('servicoId')

const servicoImg        = document.getElementById('servico-img')
const servicoNome       = document.getElementById('servico-nome')
const servicoDescricao  = document.getElementById('servico-descricao')

const montarCard = (servico) => {
    servicoImg.style.backgroundImage = `url('${servico.foto}')`
    servicoNome.textContent = servico.nome
    servicoDescricao.textContent = servico.descricao
}

window.addEventListener('load', async() => {
    const servico = await getServico(servicoId)
    montarCard(servico)
})


