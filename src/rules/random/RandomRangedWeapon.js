import RandomRoll from '/src/rules/random/RandomRoll.js'
import RangedWeaponsList from '/src/rules/lists/gear/RangedWeaponsList.js'

export default (c) => {
    let randomRangedWeapon = RandomRoll(RangedWeaponsList.list)
    randomRangedWeapon.qty = 1
    c.gear.ranged.inventory.push(randomRangedWeapon)
    return c
}