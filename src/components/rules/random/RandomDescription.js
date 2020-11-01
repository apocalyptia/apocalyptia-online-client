import RandomAge from 'description/Age.js'
import RandomHair from 'description/Hair.js'
import RandomHeight from 'description/Height.js'
import RandomName from 'description/Name.js'
import RandomSex from 'description/Sex.js'
import RandomSkin from 'description/Skin.js'
import RandomWeight from 'description/Weight.js'

export default (c) => {
    c = RandomAge(c)
    c = RandomSex(c)
    c = RandomHeight(c)
    c = RandomWeight(c)
    c = RandomSkin(c)
    c = RandomHair(c)
    c = RandomName(c)
    return c
}