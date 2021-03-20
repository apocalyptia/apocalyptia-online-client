import RandomAge from '/src/rules/random/RandomAge.js'
import RandomHair from '/src/rules/random/RandomHair.js'
import RandomHeight from '/src/rules/random/RandomHeight.js'
import RandomName from '/src/rules/random/RandomName.js'
import RandomSex from '/src/rules/random/RandomSex.js'
import RandomSkin from '/src/rules/random/RandomSkin.js'
import RandomWeight from '/src/rules/random/RandomWeight.js'

export default (c) => {
    c.description.age.value = RandomAge()
    c.description.sex.value = RandomSex()
    c.description.height.value = RandomHeight(c)
    c.description.weight.value = RandomWeight(c)
    c.description.skin.value = RandomSkin()
    c.description.hair.value = RandomHair(c)
    c.description.name.value = RandomName(c)
    return c
}