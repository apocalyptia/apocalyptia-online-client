import RandomRoll from './RandomRoll'
import MeleeWeaponList from '../../rules/gear/weapons/melee/MeleeWeaponList'

const RandomMeleeWeapon = (c) => {
    c.gear.melee.inventory.push(RandomRoll(MeleeWeaponList))
    return c
}

export default RandomMeleeWeapon