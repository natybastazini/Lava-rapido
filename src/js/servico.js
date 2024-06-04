'use strict'

import { getServico } from "./funcoes"

const servicoId = localStorage.getItem('servico-id')

const servicoImg        = document.getElementById('servico-img')
const servicoNome       = document.getElementById('servico-nome')
const servicoDescricao  = document.getElementById('servico-descricao')

const montarCard = (servico) => {
    servicoImg.src = servico.foto
    servicoNome.textContent = servico.nome
    servicoDescricao.textContent = servico.descricao
}

window.addEventListener('load', async() => {
    const servico = await getFilme(servicoId)
    montarCard(servico)
})

