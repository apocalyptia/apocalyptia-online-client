import RandomRoll from './RandomRoll'
import RangedWeaponList from '../../rules/gear/weapons/ranged/RangedWeaponList'

const RandomRangedWeapon = (c) => {
    c.gear.ranged.inventory.push(RandomRoll(RangedWeaponList))
    return c
}

export default RandomRangedWeapon