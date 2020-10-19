import RandomRoll from 'random/RandomRoll.js'
import RangedWeaponList from 'rules/gear/weapons/ranged/RangedWeaponList.js'

const RandomRangedWeapon = (c) => {
    let randomRangedWeapon = RandomRoll(RangedWeaponList)
    randomRangedWeapon.qty = 1
    c.gear.ranged.inventory.push(randomRangedWeapon)
    return c
}

export default RandomRangedWeapon