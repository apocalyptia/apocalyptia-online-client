import RandomRoll from '$rules/random/RandomRoll.js'
import MeleeWeaponList from '$rules/lists/gear/MeleeWeaponList.js'

export default (c) => {
    let randomMeleeWeapon = RandomRoll(MeleeWeaponList.list)
    randomMeleeWeapon.qty = 1
    c.gear.melee.inventory.push(randomMeleeWeapon)
    return c
}