import RandomMeleeWeapon from 'random/RandomMeleeWeapon.js'
import RandomRangedWeapon from 'random/RandomRangedWeapon.js'
import RandomWeaponAmmo from 'random/RandomWeaponAmmo.js'
import RandomArmor from 'random/RandomArmor.js'
import RandomEquipment from 'random/RandomEquipment.js'

const RandomStartingGear = (c, n) => {
    c = RandomMeleeWeapon(c)
    c = RandomRangedWeapon(c)
    c = RandomWeaponAmmo(c)
    c = RandomArmor(c)
    c = RandomEquipment(c, n)
    return c
}

export default RandomStartingGear