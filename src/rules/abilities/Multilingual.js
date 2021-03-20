import Ability from '/src/classes/Ability.js'
import LanguageList from '/src/rules/lists/LanguageList.js'

const Multilingual = new Ability({
	id: ``,
	name: `Multilingual`,
	desc: [
		`Learn a new form of communication.`,
	],
	max: 1,
	experience: 6,
	opts: LanguageList
})

export default Multilingual