import RandomMeleeWeapon from '/src/rules/random/RandomMeleeWeapon.js'
import RandomRangedWeapon from '/src/rules/random/RandomRangedWeapon.js'
import RandomWeaponAmmo from '/src/rules/random/RandomWeaponAmmo.js'
import RandomArmor from '/src/rules/random/RandomArmor.js'
import RandomEquipment from '/src/rules/random/RandomEquipment.js'

export default (c, n) => {
    c.resetGear(c)
    c = RandomMeleeWeapon(c)
    c = RandomRangedWeapon(c)
    c = RandomWeaponAmmo(c)
    c = RandomArmor(c)
    c = RandomEquipment(c, n)
    return c
}