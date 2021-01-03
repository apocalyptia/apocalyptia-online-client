import RandomRoll from 'rules/random/RandomRoll.js'
import RangedWeaponList from 'rules/lists/gear/RangedWeaponList.js'

export default (c) => {
    let randomRangedWeapon = RandomRoll(RangedWeaponList)
    randomRangedWeapon.qty = 1
    c.gear.ranged.inventory.push(randomRangedWeapon)
    return c
}