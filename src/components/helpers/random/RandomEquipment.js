import RandomRoll from 'random/RandomRoll.js'
import EquipmentList from 'rules/gear/equipment/EquipmentList.js'

const RandomEquipment = (c, n) => {
    let equipment = []
    for (let i = 0; i < n; i++) { 
        let randomItem = RandomRoll(EquipmentList)
        let existingItemIndex = equipment.findIndex(item => item.id == randomItem.id)
        if (existingItemIndex > -1) {
            equipment[existingItemIndex].qty++
        }
        else {
            randomItem.qty = 1
            equipment.push(randomItem)
        }
    }
    c.gear.equipment.inventory = [...equipment]
    return c
}

export default RandomEquipment