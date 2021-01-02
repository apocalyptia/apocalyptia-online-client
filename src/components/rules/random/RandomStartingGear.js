import Creation from 'rules/Creation.js'
import RandomMeleeWeapon from 'random/RandomMeleeWeapon.js'
import RandomRangedWeapon from 'random/RandomRangedWeapon.js'
import RandomWeaponAmmo from 'random/RandomWeaponAmmo.js'
import RandomArmor from 'random/RandomArmor.js'
import RandomEquipment from 'random/RandomEquipment.js'

export default (c, n) => {
    c = Creation.resetGear(c)
    c = RandomMeleeWeapon(c)
    c = RandomRangedWeapon(c)
    c = RandomWeaponAmmo(c)
    c = RandomArmor(c)
    c = RandomEquipment(c, n)
    return c
}