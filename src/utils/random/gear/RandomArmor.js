import RandomRoll from '/src/utils/random/dice/RandomRoll.js'
import Gear from '/src/rules/Gear.js'

export default () => {
    const randomArmor = RandomRoll(Object.values(Gear.armor))
    randomArmor.qty = 1
    return randomArmor
}