import RandomRoll from '/src/rules/random/RandomRoll.js'
import MeleeWeaponsList from '/src/rules/lists/gear/MeleeWeaponsList.js'

export default (c) => {
    let randomMeleeWeapon = RandomRoll(MeleeWeaponsList.list)
    randomMeleeWeapon.qty = 1
    c.gear.melee.inventory.push(randomMeleeWeapon)
    return c
}