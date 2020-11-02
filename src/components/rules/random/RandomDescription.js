import RandomAge from 'random/RandomAge.js'
import RandomHair from 'random/RandomHair.js'
import RandomHeight from 'random/RandomHeight.js'
import RandomName from 'random/RandomName.js'
import RandomSex from 'random/RandomSex.js'
import RandomSkin from 'random/RandomSkin.js'
import RandomWeight from 'random/RandomWeight.js'

export default (c) => {
    c.description.age.value = RandomAge()
    c.description.sex.value = RandomSex()
    c.description.height.value = RandomHeight(c)
    c.description.weight.value = RandomWeight(c)
    c.description.skin.value = RandomSkin()
    c.description.hair.value = RandomHair()
    c.description.name.value = RandomName(c)
    return c
}