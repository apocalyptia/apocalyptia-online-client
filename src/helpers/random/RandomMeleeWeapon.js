import RandomRoll from './RandomRoll'
import MeleeWeaponList from '../../rules/gear/weapons/melee/MeleeWeaponList'

const RandomMeleeWeapon = (c) => {
    let randomMeleeWeapon = RandomRoll(MeleeWeaponList)
    randomMeleeWeapon.qty = 1
    c.gear.melee.inventory.push(randomMeleeWeapon)
    return c
}

export default RandomMeleeWeapon