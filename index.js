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

        if (element.fuseable) {
            container.append(option)
        }
    });
}

function renderChoices() {
    renderChoice(abilities, inputAbility)
    renderSubChoices(abilities, inputSub)
    renderChoice(blessings, inputBlessing)
    renderChoice(traits, inputTrait)
}

function renderFusion(ability, sub, blessing, trait) {
    console.log(ability, sub, blessing, trait)
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