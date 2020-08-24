import RandomMeleeWeapon from './RandomMeleeWeapon'
import RandomRangedWeapon from './RandomRangedWeapon'
import RandomWeaponAmmo from './RandomWeaponAmmo'
import RandomArmor from './RandomArmor'
import RandomEquipment from './RandomEquipment'

const RandomStartingGear = (c, n) => {
    c = RandomMeleeWeapon(c)
    c = RandomRangedWeapon(c)
    c = RandomWeaponAmmo(c)
    c = RandomArmor(c)
    c = RandomEquipment(c, n)
    return c
}

export default RandomStartingGear