const tResponse = await fetch('./traits.json')
const traits = await tResponse.json()

const bResponse = await fetch('./blessings.json')
const blessings = await bResponse.json()

const aResponse = await fetch('./abilities.json')
const abilities = await aResponse.json()

console.log(traits)
console.log(blessings)
console.log(abilities)