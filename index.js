const aResponse = await fetch('./abilities.json')
const abilities = await aResponse.json()

const sResponse = await fetch('./subAbilities.json')
const subAbilities = await sResponse.json()

const bResponse = await fetch('./blessings.json')
const blessings = await bResponse.json()

const tResponse = await fetch('./traits.json')
const traits = await tResponse.json()

const inputAbility = document.querySelector('#inputAbility')
const inputSub = document.querySelector('#inputSub')
const inputBlessing = document.querySelector('#inputBlessing')
const inputTrait = document.querySelector('#inputTrait')

const rendered = document.querySelector('#rendered')

function renderChoice(array, container) {
    array.forEach(element => {
        const option = document.createElement('option')
        option.innerHTML = `${element.name}`

        container.append(option)
    });
}

function renderSubChoices(array, container) {
    array.forEach(element => {
        const option = document.createElement('option')
        option.innerHTML = `${element.name}`

        if (element.fuseable === true) {
            container.append(option)
        }
    });
}

function renderChoices() {
    renderChoice(abilities, inputAbility)
    renderChoice(subAbilities, inputSub)
    renderChoice(blessings, inputBlessing)
    renderChoice(traits, inputTrait)
}

function renderFusion(ability, sub, blessing, trait) {
    const abilityObj = abilities.find(obj => obj.name === ability)
    const subObj = subAbilities.find(obj => obj.name === sub)
    const blessingObj = blessings.find(obj => obj.name === blessing)
    const traitObj = traits.find(obj => obj.name === trait)


    const chosenAbility = document.createElement('div')
    chosenAbility.id = 'ability'
    chosenAbility.innerHTML = `${abilityObj.name}`

    const chosenSub = document.createElement('div')
    chosenSub.id = 'subAbility'
    chosenSub.innerHTML = `${subObj.name}`

    const chosenMoves = document.createElement('div')
    chosenMoves.id = 'moves'
    // Put here a call for a function that renders moves

    const chosenBlessing = document.createElement('div')
    chosenBlessing.id = 'blessing'
    chosenBlessing.innerHTML = `
        <div id="blessingName">${blessingObj.name}</div>
        <div id="blessingDesc">${blessingObj.desc}</div>
    `

    const chosenTrait = document.createElement('table')
    chosenTrait.id = 'trait'
    chosenTrait.innerHTML = `
        <tr>
            <td colspan="2">${traitObj.name}</td>
        </tr>
        <tr>
            <td>Potency</td>
            <td>${traitObj.potency}</td>
        </tr>
        <tr>
            <td>Speed</td>
            <td>${traitObj.speed}</td>
        </tr>
        <tr>
            <td>Resilience</td>
            <td>${traitObj.resilience}</td>
        </tr>
    `


    rendered.append(chosenAbility, chosenSub, chosenBlessing, chosenTrait, chosenMoves)
}

const fuse = document.querySelector('#fuse')

fuse.addEventListener('click', () => {
    if (inputAbility.value === "") {
        showToast("You need to choose an ability", "error")
    } else if (inputSub.value === "") {
        showToast("You need to choose a sub-ability", "error")
    } else if (inputBlessing.value === "") {
        showToast("You need to choose a blessing", "error")
    } else if (inputTrait.value === "") {
        showToast("You need to choose a trait", "error")
    } else if (inputAbility.value == inputSub.value) {
        showToast("Sub-ability cannot be the same as the main ability", "error")
    } else {
        showToast("Fusion created sucessfully!", "success")
        renderFusion(inputAbility.value, inputSub.value, inputBlessing.value, inputTrait.value)
    }
})

function showToast(message, type, duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('toast-visible');
    });

    setTimeout(() => {
        toast.classList.remove('toast-visible');

        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 200);
    }, duration);

    return toast;
}

renderChoices()