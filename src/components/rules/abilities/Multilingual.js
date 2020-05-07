import Ability from './Ability'
import Languages from '../../helpers/Languages'


const Multilingual = new Ability({
	name: `Multilingual`,
	desc: [
		`Learn a different form of communication.`,
	],
	max: 1,
	xp: 6,
	opts: Languages
})

export default Multilingual