import RandomRoll from 'random/RandomRoll.js'
import MeleeWeaponList from 'lists/gear/MeleeWeaponList.js'

const RandomMeleeWeapon = (c) => {
    let randomMeleeWeapon = RandomRoll(MeleeWeaponList)
    randomMeleeWeapon.qty = 1
    c.gear.melee.inventory.push(randomMeleeWeapon)
    return c
}

export default RandomMeleeWeapon