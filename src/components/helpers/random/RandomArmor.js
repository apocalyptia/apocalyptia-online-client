import RandomRoll from 'random/RandomRoll.js'
import ArmorList from 'rules/gear/armor/ArmorList.js'

const RandomArmor = (c) => {
    let randomArmor = RandomRoll(ArmorList)
    randomArmor.qty = 1
    c.gear.armor.inventory.push(randomArmor)
    return c
}

export default RandomArmor