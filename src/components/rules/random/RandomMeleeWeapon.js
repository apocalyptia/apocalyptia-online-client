import RandomRoll from 'random/RandomRoll.js'
import MeleeWeaponList from 'lists/gear/MeleeWeaponList.js'

export default (c) => {
    let randomMeleeWeapon = RandomRoll(MeleeWeaponList)
    randomMeleeWeapon.qty = 1
    c.gear.melee.inventory.push(randomMeleeWeapon)
    return c
}