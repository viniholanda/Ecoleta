//Preenchimento dos estados no campo
function populateUFs() {

    //selecionado dom UF
    const ufSelect = document.querySelector("[name=uf]")

    //APi
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            //laço repetição para seleção de estados
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.sigla}</option>`
            }
        })
}

populateUFs()

function getCities(event) {

    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSeletedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSeletedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//itens de coleta

const itemsToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//atulizar o campo escondido com os itens selecionados.
const collectedItems = document.querySelector("input[name=itens]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //add or remove a class with javascript
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados se sim, 
    //pegar itens selecionados 

    const alreadySelected = selectedItems.findIndex( item => {

     const itemFound = item == itemId
     return itemFound
    })
    //se já estiver selecionado, 

    if (alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemsIsDifferent = item != itemId //false
            return itemsIsDifferent
        })

        selectedItems = filteredItems
                
    } else {
        // se não estiver selecionado,
        // adicionar a seleção
        selectedItems.push(itemId)
    }

    console.log(selectedItems);
    

    //atulizar o campo escondido com os itens selecionados.
    collectedItems.value = selectedItems

}