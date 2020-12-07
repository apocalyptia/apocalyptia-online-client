import RandomRoll from 'random/RandomRoll.js'
import EquipmentList from 'lists/gear/EquipmentList.js'

export default (c, n) => {
    let equipment = []
    for (let i = 0; i < n; i++) { 
        let randomItem = RandomRoll(EquipmentList)
        let existingItemIndex = equipment.findIndex(item => item.name == randomItem.name)
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