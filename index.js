const tResponse = await fetch('./traits.json')
const traits = await tResponse.json()

const bResponse = await fetch('./blessings.json')
const blessings = await bResponse.json()

const aResponse = await fetch('./abilities.json')
const abilities = await aResponse.json()

const inputAbility = document.querySelector('#inputAbility')
const inputSub = document.querySelector('#inputSub')
const inputBlessing = document.querySelector('#inputBlessing')
const inputTrait = document.querySelector('#inputTrait')

function renderChoice(array, container){
    array.forEach(element => {
        const option = document.createElement('option')
        option.innerHTML = `${element.name}`

        container.append(option)
    });
}

function renderChoices(){
    renderChoice(abilities, inputAbility)
    renderChoice(abilities, inputSub)
    renderChoice(blessings, inputBlessing)
    renderChoice(traits, inputTrait)
}

function renderFusion(ability, subAbility, blessing, trait){
    
}

renderChoices()