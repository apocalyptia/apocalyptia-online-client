import RandomRoll from 'random/RandomRoll.js'
import ArmorList from 'lists/gear/ArmorList.js'

export default (c) => {
    let randomArmor = RandomRoll(ArmorList)
    randomArmor.qty = 1
    c.gear.armor.inventory.push(randomArmor)
    return c
}