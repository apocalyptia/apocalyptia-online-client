import RandomRoll from 'rules/random/RandomRoll.js'
import MeleeWeaponsList from 'rules/lists/gear/MeleeWeaponsList.js'

export default (c) => {
    let randomMeleeWeapon = RandomRoll(MeleeWeaponsList.list)
    randomMeleeWeapon.qty = 1
    c.gear.melee.inventory.push(randomMeleeWeapon)
    return c
}