import RandomRoll from './RandomRoll'
import EquipmentList from '../../rules/gear/equipment/EquipmentList'

const RandomEquipment = (c, n) => {
    let equipment = []
    for (let i = 0; i < n; i++) { 
        equipment.push(RandomRoll(EquipmentList))
    }
    c.gear.equipment.inventory = [...equipment]
    return c
}

export default RandomEquipment