import Ability from '$classes/Ability.js'
import LanguageList from '$rules/lists/LanguageList.js'

const Multilingual = new Ability({
	id: ``,
	name: `Multilingual`,
	desc: [
		`Learn a new form of communication.`,
	],
	max: 1,
	xp: 6,
	opts: LanguageList
})

export default Multilingual