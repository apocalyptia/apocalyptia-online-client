import Ability from '/src/classes/Ability.js'
import LanguageList from '../lists/LanguageList.js'

const Multilingual = new Ability({
	name: `Multilingual`,
	desc: [`Learn a new form of communication.`],
	max: 1,
	experience: 6,
	options: [...LanguageList]
})

export default Multilingual
