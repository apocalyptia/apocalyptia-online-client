import RandomRoll from '/src/rules/random/RandomRoll.js'
import Nd6 from '/src/rules/random/Nd6.js'
import AmmoList from '/src/rules/lists/gear/ammo/AmmoList.js'

export default (c) => {
    const compatibleAmmo = AmmoList.list.filter(a => a.cal == c.gear.ranged.inventory[0].cal)
    const randomAmmo = RandomRoll(compatibleAmmo)
    randomAmmo.qty = Nd6(1)
    c.gear.ammo.inventory.push(randomAmmo)
    return c
}