import RandomRoll from 'rules/random/RandomRoll.js'
import ArmorList from 'rules/lists/gear/ArmorList.js'

export default (c) => {
    let randomArmor = RandomRoll(ArmorList.list)
    randomArmor.qty = 1
    c.gear.armor.inventory.push(randomArmor)
    return c
}