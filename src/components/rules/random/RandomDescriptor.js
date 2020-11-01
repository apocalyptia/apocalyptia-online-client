import RandomAge from 'description/Age.js'
import RandomHair from 'description/Hair.js'
import RandomHeight from 'description/Height.js'
import RandomName from 'description/Name.js'
import RandomSex from 'description/Sex.js'
import RandomSkin from 'description/Skin.js'
import RandomWeight from 'description/Weight.js'

const descriptorList = [
    RandomAge,
    RandomHair,
    RandomHeight,
    RandomName,
    RandomSex,
    RandomSkin,
    RandomWeight
]

export default (c, i) => descriptorList[i](c)