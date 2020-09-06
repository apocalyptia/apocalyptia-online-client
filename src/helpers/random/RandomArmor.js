import RandomRoll from './RandomRoll'
import ArmorList from '../../rules/gear/armor/ArmorList'

const RandomArmor = (c) => {
    c.gear.armor.inventory.push(RandomRoll(ArmorList))
    return c
}

export default RandomArmor