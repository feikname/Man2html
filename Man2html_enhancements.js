// 2024-08-04 flamont v0.1

// 1 - criar o Main container
let htmlHeader = document.querySelector('table.head')

let jsMainContainer = document.createElement("div")
jsMainContainer.classList.add("main_container")

htmlHeader.insertAdjacentElement('afterend', jsMainContainer); 

let mainContainer = document.querySelector('div.main_container')

// 2 criar div do indice
let jsIndiceContainer = document.createElement("div")
jsIndiceContainer.classList.add("indice")
mainContainer.appendChild(jsIndiceContainer)
indiceContainer = document.querySelector('div.indice')

// 3 - mover div.manual-text para o container novo
let whatToMoveInsideMainContainer = document.querySelector('div.manual-text')

let fragment = document.createDocumentFragment();
fragment.appendChild(whatToMoveInsideMainContainer);

mainContainer.appendChild(fragment);

// 4 - gerar o indice (v4 - permitir colapsar com alt-click, nao usar <details> se não houverem subelementos)

function criaListItem(elemento) {
    let newJsListItem = document.createElement('li')
    elementoClonado = elemento.cloneNode(true)
    elementoClonado.removeAttribute('id')
    newJsListItem.appendChild(elementoClonado)

    return newJsListItem
}

function processaCliqueNoDetails(e) {
    if (e.altKey) {
        console.log("alt, tentando fechar")
        this.open = false
        //this.parentElement.open=!this.his.parentElement.open
    }
    if(e.target.tagName == "A") {
            this.open = ! this.open

    }
}

let jsUlDOIndice = document.createElement('ul')
let listaDeAnchorsNomesDeSecoes = document.querySelectorAll('h1.Sh > a')

for(i=0; i< listaDeAnchorsNomesDeSecoes.length; i++) {
    jsDetailsDessaSecao = document.createElement('details')
    jsSummaryDessaSecao = document.createElement('summary')

    jsSummaryDessaSecao.appendChild(listaDeAnchorsNomesDeSecoes[i].cloneNode(true))
    jsDetailsDessaSecao.appendChild(jsSummaryDessaSecao)


    // adicionar as <dt> como sublista
    let jsUlDosDTDessaSecao = document.createElement('ul')
    let listaDeDTsEcontradosNessaSecao = listaDeAnchorsNomesDeSecoes[i].parentElement.parentElement.querySelectorAll('dt')
    for (j=0; j < listaDeDTsEcontradosNessaSecao.length; j++) {
        let dt=listaDeDTsEcontradosNessaSecao[j]
        jsUlDosDTDessaSecao.appendChild(criaListItem(dt))
    }



    if (listaDeDTsEcontradosNessaSecao.length > 0) {
        jsDetailsDessaSecao.appendChild(jsUlDosDTDessaSecao)
        jsLiDessaSecao=criaListItem(jsDetailsDessaSecao)
    } else {
        jsLiDessaSecao=criaListItem(listaDeAnchorsNomesDeSecoes[i])
    }

    jsUlDOIndice.appendChild(jsLiDessaSecao)

}

indiceContainer.appendChild(jsUlDOIndice)
listaDeDetailsDoIndice = document.querySelectorAll('div.indice details')
for (i=0; i<listaDeDetailsDoIndice.length; i++) { 
    listaDeDetailsDoIndice[i].addEventListener('click', processaCliqueNoDetails)
}

// 5 - adicionar botão de abrir/fechar todos
jsDivBotoes = document.createElement('div')
jsDivBotoes.classList.add("div_botoes")

jsButtonAbrirTudo = document.createElement('button')
jsButtonAbrirTudo.textContent = "Abrir todos"
jsButtonAbrirTudo.id="btn-abrir-tudo"


jsButtonFecharTudo = document.createElement('button')
jsButtonFecharTudo.textContent = "Fechar todos"
jsButtonFecharTudo.id="btn-fechar-tudo"

jsDivBotoes.insertAdjacentElement('afterbegin', jsButtonFecharTudo)
jsDivBotoes.insertAdjacentElement('afterbegin', jsButtonAbrirTudo)

indiceContainer.insertAdjacentElement('afterbegin', jsDivBotoes)


document.querySelector('#btn-fechar-tudo').addEventListener('click', function(e) {
    listaDeDetailsFechados=document.querySelectorAll('div.indice details[open]')
    for(i=0; i<listaDeDetailsFechados.length; i++) {
        el = listaDeDetailsFechados[i]
        console.log(el.open)
        el.removeAttribute("open")
    }
})

document.querySelector('#btn-abrir-tudo').addEventListener('click', function(e) {
    listaDeDetailsFechados=document.querySelectorAll('div.indice details:not([open])')
    for(i=0; i<listaDeDetailsFechados.length; i++) {
        el = listaDeDetailsFechados[i]
        el.open=true
    }
})