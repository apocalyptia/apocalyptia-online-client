import RandomAge from 'rules/random/RandomAge.js'
import RandomHair from 'rules/random/RandomHair.js'
import RandomHeight from 'rules/random/RandomHeight.js'
import RandomName from 'rules/random/RandomName.js'
import RandomSex from 'rules/random/RandomSex.js'
import RandomSkin from 'rules/random/RandomSkin.js'
import RandomWeight from 'rules/random/RandomWeight.js'
import characterStore from 'stores/characterStore.js'
import { get } from 'svelte/store'

export default (name) => {
	switch (name) {
		case 'Name': return RandomName(get(characterStore))
		case 'Age': return RandomAge(get(characterStore))
		case 'Sex': return RandomSex(get(characterStore))
		case 'Height': return RandomHeight(get(characterStore))
		case 'Weight': return RandomWeight(get(characterStore))
		case 'Skin': return RandomSkin(get(characterStore))
		case 'Hair': return RandomHair(get(characterStore))
	}
}