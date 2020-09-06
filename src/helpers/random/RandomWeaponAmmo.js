import RandomRoll from './RandomRoll'
import Nd6 from './Nd6'
import AmmoList from '../../rules/gear/weapons/ammo/AmmoList'

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