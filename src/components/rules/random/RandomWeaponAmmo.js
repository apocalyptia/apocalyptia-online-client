import RandomRoll from 'random/RandomRoll.js'
import Nd6 from 'random/Nd6.js'
import AmmoList from 'lists/gear/AmmoList.js'

const RandomWeaponAmmo = (c) => {
    const compatibleAmmo = AmmoList.filter(a => {
        return a.cal == c.gear.ranged.inventory[0].cal
    })
    const ammo = RandomRoll(compatibleAmmo)
    ammo.qty = Nd6(1)
    c.gear.ammo.inventory.push(ammo)
    return c
}

export default RandomWeaponAmmo