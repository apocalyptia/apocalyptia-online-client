import RandomRoll from '/src/utils/random/dice/RandomRoll.js'
import rulesStore from '/src/stores/rulesStore.js'
import { get } from 'svelte/store'

export default () => {
	const rules = get(rulesStore)
    const randomArmor = RandomRoll(Object.values(rules.list.gear.armor))
    randomArmor.qty = 1
    return randomArmor
}