import { getServicos } from "./funcoes.js"

const criarContainer = (servico) => {
    //  <a class="w-full flex items-center justify-center" href="./servico.html">
    //             <div class="w-[80%] h-40 bg-input rounded-2xl flex flex-row justify-between p-4 border-4 border-principal hover:scale-105 duration-150">

    //                 <div class="flex flex-col gap-2">
    //                 <h1 class="font-fontDestaque text-2xl text-principal">
    //                     Lavagem Simples
    //                 </h1>
    //                 <p class="font-font text-[16px] text-letra">
    //                     descrição descrição descrição descrição descrição descrição descrição descrição  descrição descrição descrição descrição descrição descrição descrição descrição
    //                 </p>  
    //             </div>
    //             <div class="w-32 h-32 rounded-full bg-input border-2 border-principal bg-cover bg-[url(../../img/teste.svg)] bg-no-repeat"></div> 
    //             </div>
    //         </a>  

    const referenciar = document.createElement('button')
    referenciar.className = 'w-full flex items-center justify-center'
    referenciar.addEventListener('click', ()=> {
        console.log('a');
        localStorage.setItem('servicoId', servico.id)
        window.location.href = './servico.html'
    }) 

    const container = document.createElement('div')
    container.className = 'w-[80%] h-fit gap-4 bg-input rounded-2xl flex flex-row justify-between p-4 border-4 border-principal hover:scale-105 duration-150'

    const card = document.createElement('div')
    card.className = 'flex flex-col gap-2 text-left'

    const nome = document.createElement('h1')
    nome.className = 'font-fontDestaque text-2xl text-principal'
    nome.textContent = servico.nome

    const descricao = document.createElement('p')
    descricao.className = 'font-font text-[16px] text-letra'
    descricao.textContent = servico.descricao

    const cardImg = document.createElement('div')
    cardImg.className = 'w-32 h-32 rounded-full bg-input border-2 border-principal bg-cover bg-no-repeat shrink-0'
    cardImg.style.backgroundImage = `url('${servico.foto}')`

    referenciar.appendChild(container)
    container.replaceChildren(card, cardImg)
    card.replaceChildren(nome, descricao)


    // container.replaceChildren(nome, descricao, cardImg)

    card.addEventListener('click', () => {
        localStorage.setItem('servicoId', servico.id)
    })

    return referenciar


}


async function mostrarContainer() {
    const containerCards = document.getElementById('container-cards')
    const servico = await getServicos()


    console.log(servico);

    servico.forEach(servicos => {
        const card = criarContainer(servicos)
        containerCards.appendChild(card)
    })
}

mostrarContainer()




/* <div class="w-[80%] h-40 bg-input rounded-2xl flex flex-row justify-between p-4 border-4 border-principal hover:scale-105 duration-150">
            <div class="flex flex-col gap-2">
                <h1 class="font-fontDestaque text-2xl text-principal">
                    Lavagem Simples
                </h1>
                <p class="font-font text-[16px] text-letra">
                    descrição descrição descrição descrição descrição descrição descrição descrição  descrição descrição descrição descrição descrição descrição descrição descrição
                    <!-- descrição descrição descrição descrição descrição descrição descrição descrição  descrição descrição descrição descrição descrição descrição descrição descrição -->
                    <!-- descrição descrição descrição descrição descrição descrição descrição descrição  descrição descrição descrição descrição descrição descrição descrição descrição   -->
                </p>  
            </div>
            <div class="w-32 h-32 rounded-full bg-input border-2 border-principal">
                <img src="../../img/teste.svg" alt="">
            </div>
</div> */
