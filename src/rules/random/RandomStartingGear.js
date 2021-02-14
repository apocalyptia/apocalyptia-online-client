import Creation from 'rules/Creation.js'
import RandomMeleeWeapon from 'rules/random/RandomMeleeWeapon.js'
import RandomRangedWeapon from 'rules/random/RandomRangedWeapon.js'
import RandomWeaponAmmo from 'rules/random/RandomWeaponAmmo.js'
import RandomArmor from 'rules/random/RandomArmor.js'
import RandomEquipment from 'rules/random/RandomEquipment.js'

export default (c, n) => {
    c = Creation.resetGear(c)
    c = RandomMeleeWeapon(c)
    c = RandomRangedWeapon(c)
    c = RandomWeaponAmmo(c)
    c = RandomArmor(c)
    c = RandomEquipment(c, n)
    return c
}